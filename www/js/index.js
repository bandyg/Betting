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
function () {

    var app = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function (id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }
    };

    //---------------UI part------------------//
    $("a[data-role=tab]").each(function () {
        var anchor = $(this);
        anchor.bind("click", function () {
            $.mobile.changePage(anchor.attr("href"), {
                transition: "none",
                changeHash: false
            });
            return false;
        });
    });

    $("div[data-role=page]").bind("pagebeforeshow", function (e, data) {
        $.mobile.silentScroll(0);
        $.mobile.changePage.defaults.transition = 'slide';
        //var test = $(this).find("a[href=#"+this.id+"]");
        //test.html("check");
    });
    //---------------UI part------------------//

    //---------------functionality------------------//
    function MakeRequest() {

        this.requestURL = null;
        this.responseType = null;
        this.request = new XMLHttpRequest();
    }

    MakeRequest.prototype.setRequestURL = function (requestURL) {

        this.requestURL = requestURL;
    }

    MakeRequest.prototype.sendRequest = function (responseType) {

        this.request.open('GET', this.requestURL);
        this.request.responseType = responseType;
        this.request.send();
    }

    MakeRequest.prototype.bindOnload = function (responseCallback) {

        this.request.onload = responseCallback;
    }

    MakeRequest.prototype.getResponseReply = function () {

        return this.request.response;
    }


    var request = new MakeRequest();
    request.setRequestURL('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');
    request.bindOnload(function () {
        var JSONReply = request.getResponseReply();
        var superHeroes;
        if (typeof JSONReply === 'object') {
            superHeroes = JSONReply;
        } else {
            superHeroes = JSON.parse(JSONReply);
        }
        populateHeader(superHeroes);
        showHeroes(superHeroes)

    });
    request.sendRequest("json");
    //---------------functionality------------------//
}
()


