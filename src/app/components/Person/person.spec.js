/* jshint browser: true */
(function(){
  'use strict';
  
  var oneYear = (60 * 60 * 24 * 365.25) * 1000;

  describe("A person", function() {
    
    var person;
    
    /**
     * Setup
     * Prep the Mock Clock
     * Recreates the person for each test
     * Creates a spy on the Person classes `Name` method.
     */
    beforeEach(function() {
      jasmine.clock().install();
      person = new window.Person();
      jasmine.addMatchers(window.PersonMatchers);
      spyOn(person, 'Name').and.callThrough();
    });

    /**
     * Teardown
     * Removes the mock clock
     */
    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it("should be born.", function() {
      expect(person.birthdate.constructor.name).toEqual("Date");
    });

    it("hasn't been seen, whats the gender?!", function() {
      expect(person.gender).toBeUndefined();
    });

    /**
     * Test for how exceptions should be thrown
     * Must be a function
     */
    it("should either be male or female.", function() {
      expect(function(){
        person.Gender("ostrich");
      }).toThrow();
    });

    /**
     * Example of a custom matcher
     * Expects a persons `gender` value to be "male"
     */
    it("should be declared a boy!", function() {
      person.Gender("male");
      expect(person.gender).toBeDefined();
      expect(person).toBeMale();
    });

    /**
     * Example of Spy usage
     * We defined jasmine spy in the beforeEach method.
     * Now Jasmine nows when it is called within this spec and what was passed.
     */
    it("should be given a name", function() {
      person.Name("Bob");
      // Spies
      expect(person.Name).toHaveBeenCalledWith("Bob");
      expect(person.Name).not.toHaveBeenCalledWith("Wade");
      expect(person.name).toEqual("Bob");
    });

    /**
     * Using the Jasmine clock mocking functions
     * We set the jasmine clock to the time of birth
     * then use the `tick` method to jump ahead 18 years.
     * All methods called after `tick` will use this date/time.
     */
    it("grew into adulthood.", function() {
      expect(person.Age()).toBeLessThan(18);
       // Using the Jasmine clock to set, and then jump ahead 18 years.
      jasmine.clock().mockDate(person.birthdate);
      jasmine.clock().tick(oneYear * 18);
      expect(person.Age()).toBe(18);
    });

    // Nested Tests
    describe("is going thru some changes.", function() {

      /**
       * beforeEach is scoped to the parent Suite
       * Any nested Suites (describe) will not use their parents beforeEach or afterEach.
       */
      var person = new window.Person();
      person.Gender("male");
      person.Name("Bob");

      it("Some people wish to change their gender.", function() {
        var originalGender = person.Gender();
        var newGender = person.Gender("female");
        expect(originalGender).toBe("male");
        expect(newGender).toBe("female");
        expect(person).toBeFemale();
      });

      it("New body, new name, right?!", function() {
        expect(person.Name()).toBe("Bob");
        person.Name("Brenda");
        expect(person.Name()).not.toBe("Bob");
        expect(person.Name()).toBe("Brenda");
      });

      // xSkip in demo
      xit("They never once got judged, the world is extremely tolerant afterall!", function() {
        var judgement = true;
        expect(judgement).toBeFalsy();
      });

    });

    // xSkip in demo
    xdescribe("needs to be done,", function(){

      it("but isn't ready yet, go away.", function() {
        var allDone = false;
        expect(allDone).toBeTruthy();
      });

    });

  });

})();