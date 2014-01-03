/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        //check if we have an api key saved
        if (localStorage.getItem("local_api_key") === null) {

            $('.in_user_nav').hide();

            $('.left_nav').hide(); //hide left slide
            $('.main_head').hide(); //hide top nav

            $('.ok-im-in').hide();

            $("#main-user").toggleClass('active splash scroll');

        } else { //we have a key baby

            $('.let-me-in').hide();

            $.ajax({
                url:"http://162.243.249.147/api/stat.php?api_key="+localStorage.getItem("local_api_key"),
                type:'GET',
                dataType:'json',
                success: function (data) {
                    $.each(data.currency, function(index, element) {
                        $('.dame_currency').append('<li class="thumb"><img src="img/crypto/'+element.currency+'.png"><div><strong>'+element.currency+'</strong><span class="text small">'+element.confirmed_rewards+'</span></div></li>');
                    });

                    $.each(data.workers, function(index, worker) {
                        $('.give_me_some_workers').append('<li class="accept"><strong>'+worker.coin+' - <span style="text-transform:lowercase;">'+worker.worker+'</span></strong><small style="text-transform:lowercase;">hashrate: '+worker.hashrate+'</small></li>');
                    });

                    $('.are-we-mining-scrypt').html(data.mining.scrypt);
                    $('.are-we-mining-sha').html(data.mining.sha_256);
                }
            });

            

        }

        // save api key
        $(".lets-go").click(function () { 
            var api_key = $( ".api_key_field" ).val();
            localStorage.local_api_key=api_key;
            
            location.reload();
            
        });

        // destroy api key
        $(".destroy-key").click(function () {
            localStorage.removeItem('local_api_key');
            location.reload();
        });

        $(".reload-this-bitch").click(function () {
            location.reload();
        });

        Lungo.init({
            name: 'MultiStat',
            resources: [
                'sides/features.html']
        });


        var pull_example = new Lungo.Element.Pull('#main-user', {
            onPull: "Pull down to refresh",      //Text on pulling
            onRelease: "Release to get new data",//Text on releasing
            onRefresh: "Refreshing...",          //Text on refreshing
            callback: function() {               //Action on refresh
                
                location.reload();
                
                pull_example.hide();
            }
        });


    }
};
