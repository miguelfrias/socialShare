'use strict';

(function() {

  var querySelector = function(string) {
    if (!string || typeof string !== 'string' || string.length <= 0) {
      console.warn('Invalid query selector');
      return false;
    }

    console.log(string);

    if (string.indexOf('#') === 0) {
      return document.getElementById(string.slice(1));
    } else {
      document.querySelectorAll('#btn-container');
    }

  };

  window.$$ = querySelector;

  console.log('Running!');

  var btnContainer = window.$$('#btn-container');
  var currentTab = {};

  console.log('Button', btnContainer);

  var share = function(network, params) {
    var winName = 'pop';
    var winFeatures = 'width=600, height=400, scrollbars=no';
    var baseUrl = '';
    var shareURL = '';
    var url = '';

    if (!params) {
      console.warn('No URL provided.');
      return false;
    }

    shareURL = params.url;

    if (network === 'facebook') {
      baseUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
      url = baseUrl + shareURL;

      window.open(url, winName, winFeatures);
    } else if (network === 'twitter') {
      baseUrl = 'https://twitter.com/home?status=';
      url = baseUrl + shareURL;

      window.open(url, winName, winFeatures);
    } else if (network === 'google') {
      baseUrl = 'https://plus.google.com/share?url=';
      url = baseUrl + shareURL;

      window.open(url, winName, winFeatures);
    } else if (network === 'linkedin') {
      // baseUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=&title=';
      baseUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=';
      url = baseUrl + shareURL;
      if (params.title) {
        url += '&title=' + params.title;
      }

      window.open(url, winName, winFeatures);
    } else {
      console.warn('No social network provided.');
    }

  };

  var onClickHandler = function(e) {
    e.preventDefault();

    console.log('click', e);

    console.log('target: ', e.target.classList.contains('facebook'));

    var params = {};

    params.url = currentTab.url;
    params.title = currentTab.title;

    if (e.target.classList.contains('facebook')) {
      share('facebook', params);
    } else if (e.target.classList.contains('twitter')) {
      share('twitter', params);
    } else if (e.target.classList.contains('google')) {
      share('google', params);
    } else if (e.target.classList.contains('linkedin')) {
      share('linkedin', params);
    }

  };

  window.onload = function() {
    console.log('onload' + Date());
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      currentTab = tabs[0];
    });

    btnContainer.addEventListener('click', onClickHandler, false);
  };

  window.onbeforeunload = function() {
    currentTab = {};
  };

})();
