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
