HTMLWidgets.widget({

  name: 'Strip_plot',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    return {

      renderValue: function(x) {

        var chart = Splot.stripPlot(
/*
                                      objet  = {
                                            bindto:el,
                                            data:  [
                                                    [["App1",10],["App2",20],["App3",30],["App4",30],["App5",30]],
                                                    [["App1",10],["App2",20],["App3",30],["App4",30],["App5",130]],
                                                    [["App1",10],["App2",20],["App3",30],["App4",30],["App5",30]]
                                                  ], 
                                            color: ["steelblue","green","red"],
                                            axis: {
                                                  y:{
                                                    label:["Category1","Category2","Category3"]
                                                    },
                                                  x:{
                                                    label:"Axe x" 
                                                    }
                                                },  
                                            title: {
                                                  label:"Titre Graphique",
                                                  font_size:25
                                                }, 
                                          } 
*/

                                      objet  = {
                                            bindto:el,
                                            data:  x.message, 
                                            color: x.option.colors,
                                            axis: {
                                                  y:{
                                                    label: x.option.label,
                                                    rotate:90
                                                    },
                                                  x:{
                                                    label:x.option.xlab 
                                                    }
                                                },  
                                            title: {
                                                  label:x.option.title,
                                                  font_size:25
                                                }, 
                                          } 





                                    );

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size


      }

    };
  }
});