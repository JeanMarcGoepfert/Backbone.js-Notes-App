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