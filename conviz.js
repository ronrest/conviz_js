// Based on code from https://www.sitepoint.com/building-3d-engine-javascript/

// #############################################################################
//                                 PRIMITIVES
// #############################################################################
var Vertex = function(x, y, z) {
    // Defines a vertex in 3D space for our 3D objects
    this.type = "vertex3d";
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
};

var Vertex2D = function(x, y) {
    // Defines a vertex in the 2D space of the canvas screen to be rendered.
    this.type = "vertex2d";
    this.x = parseFloat(x);
    this.y = parseFloat(y);
};

