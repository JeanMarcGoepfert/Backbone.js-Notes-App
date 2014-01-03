var sampleData = [
    { title: "Learn Backbone", details: "learn backbone they said, it'll be fun they said" },
    { title: "Build an app", details: "i dunno what as long as it's awesome...facebook for dogs maybe?" },
    { title: "Profit", details: "Money in the bank!" },
    { title: "Learn Backbone", details: "learn backbone they said, it'll be fun they said" },
    { title: "Build an app", details: "i dunno what as long as it's awesome...facebook for dogs maybe?" },
    { title: "Profit", details: "Money in the bank!" }
];

var app = app || {};

app.Note = Backbone.Model.extend({
   defaults: {
    title: 'default title',
    details: 'default details'
   }
});

app.Notes = Backbone.Collection.extend({
    model: app.Note
});

app.NoteView = Backbone.View.extend({
    className: 'col-md-12 note',
    template: _.template( $('#note-template').html() ),

    render: function(){
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});

app.NotesView = Backbone.View.extend({
    el: '#notes',

    initialize: function( initialNotes ){
        this.collection = new app.Notes( initialNotes );
        this.render();
    },

    render: function(){
        this.collection.each(function( item ){
            this.renderBook( item );
        }, this);
    },

    renderBook: function( item ){
        var noteView = new app.NoteView({
            model: item
        });

        this.$el.append( noteView.render().el );
    }
});

new app.NotesView( sampleData );