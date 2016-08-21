$(function() {

	var table = {
		name: 'projekt',
		element: $('div')
	};
	var column = {
		id: '12j82da20k',
		name: 'todo',
		element: $('.column')
	};
	var card = {
		id: '2kd8s958ka',
		description: 'bnbmmb',
		color: 'green',
		element: $('.card')
	};

// Generowanie ID
	function randomString() {
    	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    	var str = '';
    	var i = 0;
    	for (i = 0; i < 10; i++) {
        	str += chars[Math.floor(Math.random() * chars.length)];
    	}
    	return str;
	};

// Klasa Column
	function Column(name) {
    	var self = this;
    	this.id = randomString();
    	this.name = name;
    	this.$element = createColumn();
		function createColumn() {
    		var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title w3-container w3-lime').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete w3-btn w3-red').text('Usuń kolumnę');
			var $columnAddCard = $('<button>').addClass('add-card w3-btn w3-light-green').text('Dodaj kartę');
			
			$columnDelete.click(function() {
        		self.removeColumn();
			});

			$columnAddCard.click(function() {
        		self.addCard(new Card(prompt("Wpisz nazwę karty")));
			});
			
			$column.append($columnDelete).append($columnTitle).append($columnAddCard).append($columnCardList);
			return $column;
    	};
	}

	Column.prototype = {
    	addCard: function(card) {
      		this.$element.children('ul').append(card.$element);
    	},
    	removeColumn: function() {
      		this.$element.remove();
    	}
	};

// Klasa Card
	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();
		function createCard(description) {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete w3-btn w3-amber').text('Usuń kartę');
			$cardDelete.click(function(){
   		    	self.removeCard();
			});
			$card.append($cardDelete).append($cardDescription);
			return $card;
		}
	};

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

// Obiekt tablicy
	var board = {
    	name: 'Tablica Kanban',
    	addColumn: function(column) {
      		this.element.append(column.$element);
      		initSortable();
    	},
    	element: $('#board .column-container')
	};

// przenoszenie kart
	function initSortable() {
    	$('.column-card-list').sortable({
      		connectWith: '.column-card-list',
      		placeholder: 'card-placeholder'
    	}).disableSelection();
  	};

  	$('.create-column').click(function(){
		var name = prompt('Wpisz nazwę kolumny');
		var column = new Column(name);
    	board.addColumn(column);
  	});
  
// Tworzenie domyślnych kolumn i kart
	// TWORZENIE KOLUMN
	var todoColumn = new Column('Do zrobienia');
	var doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Skończone');

	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('Nowe zadanie');
	var card2 = new Card('Stworzyć tablicę kanban');
	var card3 = new Card('Stworzyłem tablicę kanban');

	// DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
	doneColumn.addCard(card3);
	})