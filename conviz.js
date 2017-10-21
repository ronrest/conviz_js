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

var Cube = function(center, size, fill_color='rgba(99, 150, 255, 0.3)', line_color='rgba(0,0,0,0.3)') {
    // Generate the vertices
    var d = size / 2;
    this.type = "cube";

    this.vertices = [
        new Vertex(center.x - d, center.y - d, center.z + d),
        new Vertex(center.x - d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z + d)
    ];

    // Generate the faces
    this.faces = [
        [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
        [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
        [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
        [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
        [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
        [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
    ];

    this.line_colors = [line_color, line_color, line_color, line_color, line_color, line_color];
    this.line_width = 1
    this.fill_colors = [fill_color, fill_color, fill_color, fill_color, fill_color, fill_color];
};


var Square = function(center, size, fill_color='rgba(99, 150, 255, 0.3)', line_color='rgba(0,0,0,0.3)') {
    // Generate the vertices
    var d = size / 2;
    this.type = "square";
    this.vertices = [
        new Vertex(center.x - d, center.y - d, center.z),
        new Vertex(center.x - d, center.y + d, center.z),
        new Vertex(center.x + d, center.y + d, center.z),
        new Vertex(center.x + d, center.y - d, center.z)
    ];

    // Generate the faces
    this.faces = [
        [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]]
    ];

    this.line_colors = [line_color];
    this.line_width = 1;
    this.fill_colors = [fill_color];
};

