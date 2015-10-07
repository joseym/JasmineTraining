/* jshint browser: true */
(function(){

  'use strict';
  
  /**
   * Date utility method used to create a year, month, day object
   * @param  {Date} date Date object
   * @return {Object}    Returns an object with the year, month and day keys for 
   *                     easier consumption
   */
  function _splitDate(date) {
    date = date || new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    };
  }

  /**
   * Basic Person Class
   * Used for demo, automatically assigns a birthday at the time of creation
   * @return {Object} Returns itself for chaining methods.
   */
  function Person(){
    this.birthdate = new Date();
    return this;
  }

  /**
   * Getter/Setter method for a persons name
   * @param {String} [name] If present then the persons name is set to what is 
   *                        passed
   */
  Person.prototype.Name = function(name) {
    if (name) {
      this.name = name;
    }
    return this.name;
  };

  /**
   * Getter/Setter method for a persons gender
   * @param {String} [gender] If present then the persons gender is set to what 
   *                          is passed.
   */
  Person.prototype.Gender = function(gender) {
    if (gender) {
      if (/(male|female)/i.test(gender)) {
        this.gender = gender;
      } else {
        throw new Error("A person must be `male` or `female`.");
      }
    }
    return this.gender;
  };

  /**
   * Method used to calculate a persons age based on their birthdate
   * @param {Date} [now] If passed then the age is calculated based on this 
   *                     date, otherwise it takes the current computer clock.
   */
  Person.prototype.Age = function(now){

    var birth, age;

    now = now || new Date();
    
    now = _splitDate(now);
    birth = _splitDate(this.birthdate);

    age = now.year - birth.year; 

    if (now.month < birth.month - 1) {
      age--;
    }

    if (birth.month - 1 === now.month && now.day < birth.day) {
      age--;
    }

    return age;

  };


  window.Person = Person;

})();
