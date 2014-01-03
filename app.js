var sampleData = [
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

    events: {
        'click .delete-note' : 'deleteNote',
        'click .edit-note'   : 'editNote',
        'click .save-note'   : 'saveNote'
    },

    render: function(){
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    },

    deleteNote: function(){
        this.model.destroy();
        this.$el.slideUp(100, function(){
            this.remove();
        });
    },

    editNote: function(){
        this.$el.addClass('editing');
        this.$el.find('.form input').focus();
    },

    saveNote: function(){
        var updatedValues = {},
            editFields = this.$el.find('input, textarea');

        editFields.each(function(i, el){
            if ( $( el ).val() !== '' ) {
                updatedValues[ el.id ] = $( el ).val();
            }
        });

        this.model.set({
            title: updatedValues.title,
            details: updatedValues.details
        });

        this.$el.removeClass('editing');

        this.render();
    }
});

app.NotesView = Backbone.View.extend({
    el: '.container',

    events: {
        'click #add-note': 'addNote'
    },

    initialize: function( initialNotes ){
        this.collection = new app.Notes( initialNotes );
        this.render();
        this.listenTo( this.collection, 'add', this.renderNote );
    },

    render: function(){
        this.collection.each(function( item ){
            this.renderNote( item );
        }, this);
    },

    renderNote: function( item ){
        var noteView = new app.NoteView({
            model: item
        });

        this.$el.find('#notes').append( noteView.render().el );
    },

    addNote: function( e ){
        e.preventDefault();
        var formData = {},
            noteFormFields = this.$el.find('input, textarea');

        noteFormFields.each(function( i, el ){
            if( $( el ).val() !== '' ) {
                formData[ el.id ] = $( el ).val();
            }
        });

        this.collection.add( new app.Note( formData ) );
    }
});

new app.NotesView( sampleData );