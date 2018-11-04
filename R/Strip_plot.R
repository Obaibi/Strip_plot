#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
Strip_plot <- function(VarX, VarY, Label=NULL,colors=NULL,title="", xlab=NULL, width = NULL, height = NULL, elementId = NULL) {

  
  #On teste si le label est null
  if(length(Label) != length(VarX)){
      Label = rep("",length(VarX))
  } 
  Label = as.character(Label)
  
  #Données à envoyer sous forme JSON
  Array = list()
  for(cate in 1:length(unique(VarY))){
    category = as.character(unique(VarY)[cate])
    Array[[cate]] <- list()
    for(i in 1:length(VarX[VarY == category])){
        Array[[cate]][[i]] <- c(Label[VarY == category][i],VarX[VarY == category][i])
    }
  }
  
  
  # forward options using x
  x = list(
    message = Array, 
    option = list(title=title, label=unique(VarY), colors=colors, xlab=xlab)
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'Strip_plot',
    x,
    width = width,
    height = height,
    package = 'Stripplot',
    elementId = elementId
  )
}

#' Shiny bindings for Strip_plot
#'
#' Output and render functions for using Strip_plot within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a Strip_plot
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name Strip_plot-shiny
#'
#' @export
Strip_plotOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'Strip_plot', width, height, package = 'Stripplot')
}

#' @rdname Strip_plot-shiny
#' @export
renderStrip_plot <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, Strip_plotOutput, env, quoted = TRUE)
}
