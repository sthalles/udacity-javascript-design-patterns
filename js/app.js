var cats = [
    {
        "name": "Consuelo", 
        "clickCount": 0,
        "imgSource": "img/cat1.jpg",
		"nicknames": ["Gatinha"]
    }, 
	{
        "name": "Puppy", 
        "clickCount": 0,
        "imgSource": "img/cat2.jpg",
		"nicknames": ["Bixano"]
    },
    {
        "name": "Genie Bouchard",
        "clickCount": 0,
        "imgSource": "img/cat3.jpg",
		"nicknames": ["Scooby"]
    } 
];

var Cat = function(data) {
	// For simplicity, lets create our model inside the ViewModel, 
	// the important thing to keep in mind is that Knockout
	// will functionally separete the Model from the View.
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.imgSource = ko.observable(data.imgSource);
	this.nicknames = ko.observableArray(data.nicknames);
	// end of Model definition
	
	this.level = ko.computed(function(){
		if (this.clickCount() >= 10) {
			return "Infant";	
		} else {
			return "Newborn";
		}
		
	}, this);
}

var ViewModel = function() {
	var self = this; // self is the ViewModel Context
	
	// observable array to keep track of the cats
	this.catList = ko.observableArray([]);
	
	// iterate over the cat data and add one by one to the cat list
	cats.forEach(function(catItem){
		self.catList.push(new Cat(catItem)); // store each cat in the cat list
	});
	
	// creates the first cat
	this.currentCat = ko.observable(this.catList()[0]);
	console.log(this.catList()[0]);
	
	this.updateImg = function(clickedItem) {
		self.currentCat( clickedItem );
	};
	
	// View Model
	// Because Knockout will handle the View - Model syncronization
	// the only time we need ViewModel methods is when we
	// need to update the data.
	this.incrementCounter = function() {
		self.currentCat().clickCount( self.currentCat().clickCount() + 1 );
	};
}

// activate the declarative html binding attributes
// The first parameter says what view model object 
// you want to use with the declarative bindings it activates
ko.applyBindings(new ViewModel());