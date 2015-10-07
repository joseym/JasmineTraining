/* jshint browser: true */
(function(){
  'use strict';

  /**
   * Utility method to match a persons gender.
   * @param  {Object} person      A person object
   * @param  {String} [expected]  The gender we expect the person to be.  
   * @return {Object}             An object with a pass key of either true or 
   *                              false, and the message.
   */
  function expectedGender(person, expected) {

    if (expected === undefined) {
      expected = '';
    }

    var result = {};

    result.pass = person.gender === expected;

    if (result.pass) {
      result.message = "Expected Person to be male! It totally was.";
    } else {
      result.message = "Expected Person to be male, but it was a " + 
        person.gender + " instead.";
    }

    return result;
    
  }

  window.PersonMatchers = {

    toBeMale: function() {
      return {
        compare: function(person, expected) {
          if (expected === undefined) {
            expected = 'male';
          }
          return expectedGender(person, expected);
        }
      };
    },

    toBeFemale: function() {
      return {
        compare: function(person, expected) {
          if (expected === undefined) {
            expected = 'female';
          }
          return expectedGender(person, expected);
        }
      };
    }

  };

})();