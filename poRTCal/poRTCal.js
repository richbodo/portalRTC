if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
    Template.hello.helpers({
      counter: function () {
        return Session.get('counter');
      }
    });

    Template.hello.events({
      'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
      }
    });

  Template.menu.onRendered(function(){
    this.$(".menu-trigger").sideNav();
    // this.$(".dropdown-button").dropdown({
    //   hover:false
    // });
  });

}

// Template.menu.onRendered(function(){
// });