var Cat = function() {
	// For simplicity, lets create our model inside the ViewModel, 
	// the important thing to keep in mind is that Knockout
	// will functionally separete the Model from the View.
	this.clickCount = ko.observable(0);
	this.name = ko.observable("Tabby");
	this.imgSource = ko.observable("img/cat1.jpg");
	this.level = ko.observable("Newborn");
	this.nicknames = ko.observableArray([
		{name: "Consul"},
		{name: "Bixano"},
		{name: "Miao"},
		{name: "Gatinho"}
	]);
	// end of Model definition
	
	this.levels = ko.computed(function(){
		if (this.clickCount() == 10) {
			this.level("Infant");	
		}
		
	}, this);
}

var ViewModel = function() {
	
	this.currentCat = ko.observable(new Cat());
	
	// View Model
	// Because Knockout will handle the View - Model syncronization
	// the only time we need ViewModel methods is when we
	// need to update the data.
	this.incrementCounter = function() {
		this.currentCat().clickCount( this.currentCat().clickCount() + 1 );
	};
	
	var self = this;
	this.removeNickname = function(){
		self.currentCat().nicknames.remove(this);
	};
}

// activate the declarative html binding attributes
// The first parameter says what view model object 
// you want to use with the declarative bindings it activates
ko.applyBindings(new ViewModel());