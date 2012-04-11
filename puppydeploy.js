Counts = new Meteor.Collection("counts");

if (Meteor.is_client) {
  Template.puppy.puppy_count = function () {
    var puppies = Counts.findOne({name: 'puppies'});
    addPuppy();
    return puppies && puppies.amount;
  };

  Template.puppy.events = {
    'click input' : function () {
      Counts.update({name: 'puppies'}, {$inc: {amount: 1}})
    }
  };

  addPuppy = function () {
    $img = $('<img class="rand_pup" style="display:none;width:240px" src="http://www.randomdoggiegenerator.com/randomdoggie.php?' + new Date().getTime() + '" />');
    $img.prependTo("#puppies").fadeIn();
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    if(Counts.findOne({name: 'puppies'}) === undefined) {
      Counts.insert({name: 'puppies', amount: 0});
    }
  });
}