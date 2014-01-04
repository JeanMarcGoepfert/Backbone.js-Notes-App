var sampleData = [
    { title: "Learn Backbone", details: "Learn backbone they said, it'll be fun they said" },
    { title: "Build an app", details: "For maximum success, create a social networking app specifically for sharing images of dogs balancing bacon on their noses" },
    { title: "Profit", details: "I got 99 problems but a dog balancing bacon on it's nose ain't one" }
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

        var editNoteView = new app.EditNoteView({
            model: this.model
        });

        this.$el.find('.row').prepend( editNoteView.render().el );

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

app.EditNoteView = Backbone.View.extend({
    className: 'col-md-9 form',
    template: _.template( $('#edit-note').html() ),

    render: function(){
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
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
            noteFormFields = this.$el.find('#note-form input, #note-form textarea');

        noteFormFields.each(function( i, el ){
            if( $( el ).val() !== '' ) {
                formData[ el.id ] = $( el ).val();
            }
        });

        this.collection.add( new app.Note( formData ) );
    }
});

new app.NotesView( sampleData );