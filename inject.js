console.log('executing injected script from Musician extension on JioSaavn page');
var my_awesome_script = document.createElement('script');

my_awesome_script.setAttribute('src', "http://localhost:8181/test.js");

document.head.appendChild(my_awesome_script);
