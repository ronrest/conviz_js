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

// TODO: Add grid primitive
// TODO: Add kernel primitive
// TODO: Add connection primitive

// #############################################################################
//                                 DRAWING
// #############################################################################
function project(vertex) {
    /*  ORTHOGRAPHIC PROJECTION
        Takes a vertex in 3D space and returns a vertex in the 2D plane
    */
    // return new Vertex2D(vertex.x, vertex.z);
    return new Vertex2D(vertex.x, vertex.y);
}

// function project(vertex) {
//     // PERSPECTIVE PROJECTION
//     // BUG: Something is wrong with this calculation.
//     // Distance between the camera and the plane
//     var distance = 100;
//     var ratio = -distance / (vertex.z);
//     return new Vertex2D(ratio * vertex.x, ratio * (vertex.y));
// }


function render(objects, ctx, dx=0, dy=0) {
    /*  Function to display 3D objects.
        Takes an array listing the objects to render, the context of the canvas
        to display the objects, and other details needed to draw the objects at
        the right place.

    Args:
        objects:    () Objects to render
        ctx:        (html5 Canvas Context)
        dx:         (int) x offset from center of canvas
        dy:         (int) y offset from center of canvas

    NOTES:
        The array can contain several objects to render.
        These objects have to respect one thing: having a public property named
        `faces` that is an array listing all the faces of the object.
        These faces can be anything (square, triangle, dodecagon.. etc)
        they just need to be arrays listing their vertices.
    */
    // Clear the previous frame
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var dx = dx + ctx.canvas.width / 2;
    var dy = dy + ctx.canvas.height / 2;


    // TODO: fix aspect ratio when screen gets resized
    // ctx.canvas.width = ctx.canvas.offsetWidth;
    // ctx.canvas.height = ctx.canvas.offsetHeight;

    // For each object
    for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
        // For each face of the object
        for (var j = 0, n_faces = objects[i].faces.length; j < n_faces; ++j) {
            // Current face
            var face = objects[i].faces[j];

            // Face Colors
            ctx.lineWidth = objects[i].line_width;
            ctx.strokeStyle = objects[i].line_colors[j];
            ctx.fillStyle = objects[i].fill_colors[j];

            // Draw the first vertex of the face - to start the `path`
            var P = project(face[0]);
            ctx.beginPath();
            // NOTE: -y because positive Z points up in 3D space, and positive
            // y points down in the canvas coordinates
            ctx.moveTo(P.x + dx, -P.y + dy);

            // Draw the remaining vertices of the face
            for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
                P = project(face[k]);
                // NOTE: -y because positive Z points up in 3D space, and positive
                // y points down in the canvas coordinates
                ctx.lineTo(P.x + dx, -P.y + dy);
            }

            // Close the path and draw the face
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
    }
}

// #############################################################################
//                               TRANSFOMRATIONS
// #############################################################################

// Rotate a vertice
function rotateVertex(vertex, center, theta, phi) {
    // Rotation matrix coefficients
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    var cp = Math.cos(phi);
    var sp = Math.sin(phi);

    // Rotation
    var x = vertex.x - center.x;
    var y = vertex.y - center.y;
    var z = vertex.z - center.z;

    vertex.x = ct * x - st * cp * (-z) + st * sp * y + center.x;
    vertex.y = sp * (-z) + cp * y + center.y;
    vertex.z = -(st * x + ct * cp * (-z) - ct * sp * y + center.z);

}



// Events
var mousedown = false;
var mx = 0;
var my = 0;

// Initialize the mouse drag movement
function initMouseDrag(evt) {
    // clearTimeout(autorotate_timeout);
    mousedown = true;
    mx = evt.clientX;
    my = evt.clientY;
}


function mouseDragRotation(evt, context, objects) {
    // TODO: Pass teh context as an arument
    // alert(objects[1].vertices[1].y);
    if (mousedown) {
        var theta = (evt.clientX - mx) * Math.PI / 360;
        var phi = (evt.clientY - my) * Math.PI / 180;

        // For each object
        for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
            n_vertices = objects[i].vertices.length
            // For each vertex of the object
            for (var j = 0; j < n_vertices; ++j)
                rotateVertex(objects[i].vertices[j], canvas_center, theta, phi);
        };

        mx = evt.clientX;
        my = evt.clientY;

        // render(objects, ctx, dx, dy);
        render(objects, context);
    }
}


function stopMouseDrag() {
    mousedown = false;
    // autorotate_timeout = setTimeout(autorotate, 2000);
}

var canvas_center = new Vertex(0, 0, 0);

