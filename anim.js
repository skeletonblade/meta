var _slicedToArray = require("/home/runner/work/website/website/node_modules/@babel/runtime/helpers/slicedToArray");

var _toConsumableArray = require("/home/runner/work/website/website/node_modules/@babel/runtime/helpers/toConsumableArray");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var perspective = require('gl-mat4/perspective');

var multiply = require('gl-mat4/multiply');

var lookAt = require('gl-mat4/lookAt');

var invert = require('gl-mat4/invert');

var rotate = require('gl-mat4/rotate');

var transform = require('gl-vec3/transformMat4');

var SVG_NS = 'http://www.w3.org/2000/svg';
module.exports = {
  calculateSizingOptions: calculateSizingOptions,
  createLogoViewer: createLogoViewer,
  createModelRenderer: createModelRenderer,
  loadModelFromJson: loadModelFromJson,
  positionsFromModel: positionsFromModel,
  createPolygonsFromModelJson: createPolygonsFromModelJson,
  createStandardModelPolygon: createStandardModelPolygon,
  createMatrixComputer: createMatrixComputer,
  compareZ: compareZ,
  createFaceUpdater: createFaceUpdater,
  createNode: createNode,
  setAttribute: setAttribute,
  setGradientDefinitions: setGradientDefinitions,
  setMaskDefinitions: setMaskDefinitions,
  svgElementToSvgImageContent: svgElementToSvgImageContent,
  Polygon: Polygon
};
/**
 * A distance measurement used for SVG attributes. A length is specified as a number followed by a
 * unit identifier.
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#length} for further
 * information.
 *
 * @typedef {`${number}${'em' | 'ex' | 'px' | 'in' | 'cm' | 'mm' | 'pt' | 'pc' | '%'}`} SvgLength
 */

/**
 * A definition for a `<stop>` SVG element, which defines a color and the position for that color
 * on a gradient. This element is always a child of either a `<linearGradient>` or
 * `<radialGradient>` element.
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop} for more information
 * about the `<stop>` element.
 *
 * @typedef {object} StopDefinition
 * @property {number | `${number}%`} [offset] - The location of the gradient stop along the
 * gradient vector.
 * @property {string} [stop-color] - The color of the gradient stop. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop}.
 * @property {number} [stop-opacity] - The opacity of the gradient stop. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stop-opacity}.
 */

/**
 * A definition for a `<linearGradient>` SVG element. This definition includes all supported
 * `<linearGradient>` attributes, and it includes a `stops` property which is an array of
 * definitions for each `<stop>` child node.
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient} for more
 * information about the `<linearGradient>` element.
 *
 * @typedef {object} LinearGradientDefinition
 * @property {string} [gradientTransform] - A transform from the gradient coordinate system to the
 * target coordinate system. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientTransform}.
 * @property {'userSpaceOnUse' | 'objectBoundingBox'} [gradientUnits] - The coordinate system used.
 * for the coordinate attributes. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientUnits}.
 * @property {'pad' | 'reflect' | 'repeat'} [spreadMethod] - The method used to fill a shape beyond
 * the defined edges of a gradient. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/spreadMethod}.
 * @property {StopDefinition[]} [stops] - The colors of the gradient, and the position of each
 * color along the gradient vector.
 * @property {'linear'} type - The type of the gradient.
 * @property {SvgLength} [x1] - The x coordinate of the starting point of the vector gradient.
 * @property {SvgLength} [x2] - The x coordinate of the ending point of the vector gradient.
 * @property {SvgLength} [y1] - The y coordinate of the starting point of the vector gradient.
 * @property {SvgLength} [y2] - The y coordinate of the ending point of the vector gradient.
 */

/**
 * A definition for a `<radialGradient>` SVG element. This definition includes all supported
 * `<radialGradient>` attributes, and it includes a `stops` property which is an array of
 * definitions for each `<stop>` child node.
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient} for more
 * information about the `<radialGradient>` element.
 *
 * @typedef {object} RadialGradientDefinition
 * @property {SvgLength} [cx] - The x coordinate of the end circle of the radial gradiant.
 * @property {SvgLength} [cy] - The y coordinate of the end circle of the radial gradient.
 * @property {SvgLength} [fr] - The radius of the start circle of the radial gradient.
 * @property {SvgLength} [fx] - The x coordinate of the start circle of the radial gradient.
 * @property {SvgLength} [fy] - The y coordinate of the start circle of the radial gradient.
 * @property {string} [gradientTransform] - A transform from the gradient coordinate system to the
 * target coordinate system. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientTransform}.
 * @property {'userSpaceOnUse' | 'objectBoundingBox'} [gradientUnits] - The coordinate system used
 * for the coordinate attributes. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientUnits}.
 * @property {SvgLength} [r] - The radius of the end circle of the radial gradient.
 * @property {'pad' | 'reflect' | 'repeat'} [spreadMethod] - The method used to fill a shape beyond
 * the defined edges of a gradient. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/spreadMethod}.
 * @property {StopDefinition[]} [stops] - The colors of the gradient, and the position of each
 * color along the gradient vector.
 * @property {'radial'} type - The type of the gradient.
 */

function createLogoViewer(container, renderScene) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$followMouse = _ref.followMouse,
      followMouse = _ref$followMouse === void 0 ? false : _ref$followMouse,
      _ref$followMotion = _ref.followMotion,
      followMotion = _ref$followMotion === void 0 ? false : _ref$followMotion,
      _ref$slowDrift = _ref.slowDrift,
      slowDrift = _ref$slowDrift === void 0 ? false : _ref$slowDrift,
      _ref$lazyRender = _ref.lazyRender,
      lazyRender = _ref$lazyRender === void 0 ? true : _ref$lazyRender;

  var shouldRender = true;
  var mouse = {
    x: 0,
    y: 0
  };
  var lookCurrent = [0, 0];
  var lookRate = 0.3; // closes over scene state

  var renderCurrentScene = function renderCurrentScene() {
    updateLookCurrent();
    renderScene(lookCurrent, slowDrift);
  };

  function setLookAtTarget(target) {
    var bounds = container.getBoundingClientRect();
    mouse.x = 1.0 - 2.0 * (target.x - bounds.left) / bounds.width;
    mouse.y = 1.0 - 2.0 * (target.y - bounds.top) / bounds.height;
  }

  function stopAnimation() {
    shouldRender = false;
  }

  function startAnimation() {
    shouldRender = true;
  }

  function setFollowMouse(state) {
    // eslint-disable-next-line no-param-reassign
    followMouse = state;
  }

  function setFollowMotion(state) {
    // eslint-disable-next-line no-param-reassign
    followMotion = state;
  }

  window.addEventListener('mousemove', function (ev) {
    if (!shouldRender) {
      startAnimation();
    }

    if (followMouse) {
      setLookAtTarget({
        x: ev.clientX,
        y: ev.clientY
      });
      renderCurrentScene();
    }
  });
  window.addEventListener('deviceorientation', function (event) {
    if (!shouldRender) {
      startAnimation();
    }

    if (followMotion) {
      // gamma: left to right
      var leftToRight = event.gamma; // beta: front back motion

      var frontToBack = event.beta; // x offset: needed to correct the intial position

      var xOffset = 200; // y offset: needed to correct the intial position

      var yOffset = -300; // acceleration

      var acceleration = 10;
      setLookAtTarget({
        x: xOffset + leftToRight * acceleration,
        y: yOffset + frontToBack * acceleration
      });
      renderCurrentScene();
    }
  });

  function lookAtAndRender(target) {
    // update look target
    setLookAtTarget(target); // this should prolly just call updateLookCurrent or set lookCurrent values to eaxactly lookTarget
    // but im not really sure why its different, so im leaving it alone

    lookCurrent[0] = mouse.x;
    lookCurrent[1] = mouse.y + 0.085 / lookRate;
    renderCurrentScene();
  }

  function renderLoop() {
    if (!shouldRender) {
      return;
    }

    window.requestAnimationFrame(renderLoop);
    renderCurrentScene();
  }

  function updateLookCurrent() {
    var li = 1.0 - lookRate;
    lookCurrent[0] = li * lookCurrent[0] + lookRate * mouse.x;
    lookCurrent[1] = li * lookCurrent[1] + lookRate * mouse.y + 0.085;
  }

  if (lazyRender) {
    renderCurrentScene();
  } else {
    renderLoop();
  }

  return {
    container: container,
    lookAt: setLookAtTarget,
    setFollowMouse: setFollowMouse,
    setFollowMotion: setFollowMotion,
    stopAnimation: stopAnimation,
    startAnimation: startAnimation,
    lookAtAndRender: lookAtAndRender,
    renderCurrentScene: renderCurrentScene
  };
}

function loadModelFromJson(modelJson) {
  var createSvgPolygon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createStandardModelPolygon;
  var vertCount = modelJson.positions.length;
  var positions = new Float32Array(3 * vertCount);
  var transformed = new Float32Array(3 * vertCount);

  var _createPolygonsFromMo = createPolygonsFromModelJson(modelJson, createSvgPolygon),
      polygons = _createPolygonsFromMo.polygons,
      polygonsByChunk = _createPolygonsFromMo.polygonsByChunk;

  positionsFromModel(positions, modelJson);
  var updatePositions = createPositionUpdater(positions, transformed, vertCount);
  var modelObj = {
    updatePositions: updatePositions,
    positions: positions,
    transformed: transformed,
    polygons: polygons,
    polygonsByChunk: polygonsByChunk
  };
  return modelObj;
}

function createModelRenderer(container, cameraDistance, modelObj) {
  var updatePositions = modelObj.updatePositions,
      transformed = modelObj.transformed,
      polygons = modelObj.polygons;

  var _iterator = _createForOfIteratorHelper(polygons),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var polygon = _step.value;
      container.appendChild(polygon.svg);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var computeMatrix = createMatrixComputer(cameraDistance);
  var updateFaces = createFaceUpdater(container, polygons, transformed);
  return function (rect, lookPos, slowDrift) {
    var matrix = computeMatrix(rect, lookPos, slowDrift);
    updatePositions(matrix);
    updateFaces(rect, container, polygons, transformed);
  };
}

function positionsFromModel(positions, modelJson) {
  var pp = modelJson.positions;
  var ptr = 0;

  for (var i = 0; i < pp.length; ++i) {
    var p = pp[i];

    for (var j = 0; j < 3; ++j) {
      positions[ptr] = p[j];
      ptr += 1;
    }
  }
}

function createPolygonsFromModelJson(modelJson, createSvgPolygon) {
  var polygons = [];
  var polygonsByChunk = modelJson.chunks.map(function (chunk, index) {
    var faces = chunk.faces;
    return faces.map(function (face) {
      var svgPolygon = createSvgPolygon(chunk, {
        gradients: modelJson.gradients,
        index: index,
        masks: modelJson.masks
      });
      var polygon = new Polygon(svgPolygon, face);
      polygons.push(polygon);
      return polygon;
    });
  });
  return {
    polygons: polygons,
    polygonsByChunk: polygonsByChunk
  };
}
/**
 * Create an SVG `<polygon> element.
 *
 * This polygon is assigned the correct `fill` and `stroke` attributes, according to the chunk
 * definition provided. But the `points` attribute is always set to a dummy value, as it gets reset
 * later to the correct position during each render loop.
 *
 * @param {object} chunk - The definition for the chunk of the model this polygon is a part of.
 * This includes the color or gradient to apply to the polygon.
 * @param {object} options - Polygon options.
 * @param {(LinearGradientDefinition | RadialGradientDefinition)[]} [options.gradients] - The set of
 * all gradient definitions used in this model.
 * @param options.index - The index for the chunk this polygon is found in.
 * @returns {Element} The `<polygon>` SVG element.
 */


function createStandardModelPolygon(chunk, _ref2) {
  var _ref2$gradients = _ref2.gradients,
      gradients = _ref2$gradients === void 0 ? {} : _ref2$gradients,
      index = _ref2.index,
      masks = _ref2.masks;
  var svgPolygon = createNode('polygon');

  if (chunk.gradient && chunk.color) {
    throw new Error("Both gradient and color for chunk '".concat(index, "'. These options are mutually exclusive."));
  } else if (chunk.gradient) {
    var gradientId = chunk.gradient;

    if (!gradients[gradientId]) {
      throw new Error("Gradient ID not found: '".concat(gradientId, "'"));
    }

    setAttribute(svgPolygon, 'fill', "url('#".concat(gradientId, "')"));
    setAttribute(svgPolygon, 'stroke', "url('#".concat(gradientId, "')"));
  } else {
    var fill = typeof chunk.color === 'string' ? chunk.color : "rgb(".concat(chunk.color, ")");
    setAttribute(svgPolygon, 'fill', fill);
    setAttribute(svgPolygon, 'stroke', fill);
  }

  if (chunk.mask) {
    if (!masks[chunk.mask]) {
      throw new Error("Mask ID not found: '".concat(chunk.mask, "'"));
    }

    setAttribute(svgPolygon, 'mask', "url('#".concat(chunk.mask, "')"));
  }

  setAttribute(svgPolygon, 'points', '0,0, 10,0, 0,10');
  return svgPolygon;
}

function createMatrixComputer(distance) {
  var objectCenter = new Float32Array(3);
  var up = new Float32Array([0, 1, 0]);
  var projection = new Float32Array(16);
  var model = new Float32Array(16);
  var view = lookAt(new Float32Array(16), new Float32Array([0, 0, distance]), objectCenter, up);
  var invView = invert(new Float32Array(16), view);
  var invProjection = new Float32Array(16);
  var target = new Float32Array(3);
  var transformedMatrix = new Float32Array(16);
  var X = new Float32Array([1, 0, 0]);
  var Y = new Float32Array([0, 1, 0]);
  var Z = new Float32Array([0, 0, 1]);
  return function (rect, lookPos, slowDrift) {
    var viewportWidth = rect.width;
    var viewportHeight = rect.height;
    perspective(projection, Math.PI / 4.0, viewportWidth / viewportHeight, 100.0, 1000.0);
    invert(invProjection, projection);
    target[0] = lookPos[0];
    target[1] = lookPos[1];
    target[2] = 1.2;
    transform(target, target, invProjection);
    transform(target, target, invView);
    lookAt(model, objectCenter, target, up); // this shouldnt operate directly on the matrix/model,
    // it should likely operate on the lookPos
    // if we do want to operate on the matrix/model, it shouldnt happen here

    if (slowDrift) {
      var time = Date.now() / 1000.0;
      rotate(model, model, 0.1 + Math.sin(time / 3) * 0.2, X);
      rotate(model, model, -0.1 + Math.sin(time / 2) * 0.03, Z);
      rotate(model, model, 0.5 + Math.sin(time / 3) * 0.2, Y);
    }

    multiply(transformedMatrix, projection, view);
    multiply(transformedMatrix, transformedMatrix, model);
    return transformedMatrix;
  };
}

function createPositionUpdater(positions, transformed, vertCount) {
  return function (M) {
    var m00 = M[0];
    var m01 = M[1];
    var m02 = M[2];
    var m03 = M[3];
    var m10 = M[4];
    var m11 = M[5];
    var m12 = M[6];
    var m13 = M[7];
    var m20 = M[8];
    var m21 = M[9];
    var m22 = M[10];
    var m23 = M[11];
    var m30 = M[12];
    var m31 = M[13];
    var m32 = M[14];
    var m33 = M[15];

    for (var i = 0; i < vertCount; ++i) {
      var x = positions[3 * i];
      var y = positions[3 * i + 1];
      var z = positions[3 * i + 2];
      var tw = x * m03 + y * m13 + z * m23 + m33;
      transformed[3 * i] = (x * m00 + y * m10 + z * m20 + m30) / tw;
      transformed[3 * i + 1] = (x * m01 + y * m11 + z * m21 + m31) / tw;
      transformed[3 * i + 2] = (x * m02 + y * m12 + z * m22 + m32) / tw;
    }
  };
}

function compareZ(a, b) {
  return b.zIndex - a.zIndex;
}

function createFaceUpdater(container, polygons, transformed) {
  var toDraw = [];
  return function (rect) {
    var i;
    var w = rect.width;
    var h = rect.height;
    toDraw.length = 0;

    for (i = 0; i < polygons.length; ++i) {
      var poly = polygons[i];
      var indices = poly.indices;
      var i0 = indices[0];
      var i1 = indices[1];
      var i2 = indices[2];
      var ax = transformed[3 * i0];
      var ay = transformed[3 * i0 + 1];
      var bx = transformed[3 * i1];
      var by = transformed[3 * i1 + 1];
      var cx = transformed[3 * i2];
      var cy = transformed[3 * i2 + 1];
      var det = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);

      if (det < 0) {
        continue;
      }

      var points = [];
      var zmax = -Infinity;
      var zmin = Infinity;
      var element = poly.svg;

      for (var j = 0; j < 3; ++j) {
        var idx = indices[j];
        points.push("".concat(0.5 * w * (1.0 - transformed[3 * idx]), ",").concat(0.5 * h * (1.0 - transformed[3 * idx + 1])));
        var z = transformed[3 * idx + 2];
        zmax = Math.max(zmax, z);
        zmin = Math.min(zmin, z);
      }

      poly.zIndex = zmax + 0.25 * zmin;
      var joinedPoints = points.join(' ');

      if (joinedPoints.indexOf('NaN') === -1) {
        setAttribute(element, 'points', joinedPoints);
      }

      toDraw.push(poly);
    }

    toDraw.sort(compareZ);
    var newPolygons = toDraw.map(function (poly) {
      return poly.svg;
    });
    var defs = container.getElementsByTagName('defs');
    var maskChildren = container.getElementsByTagName('mask');
    container.replaceChildren.apply(container, _toConsumableArray(defs).concat(_toConsumableArray(maskChildren), _toConsumableArray(newPolygons)));
  };
}

function calculateSizingOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var width = options.width || 400;
  var height = options.height || 400;

  if (!options.pxNotRatio) {
    width = Math.floor(window.innerWidth * (options.width || 0.25));
    height = Math.floor(window.innerHeight * options.height || width);

    if ('minWidth' in options && width < options.minWidth) {
      width = options.minWidth;
      height = Math.floor(options.minWidth * options.height / options.width);
    }
  }

  return {
    width: width,
    height: height
  };
}

function createNode(type) {
  return document.createElementNS(SVG_NS, type);
}

function setAttribute(node, attribute, value) {
  node.setAttributeNS(null, attribute, value);
}

function svgElementToSvgImageContent(svgElement) {
  var inner = svgElement.innerHTML;
  var head = "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"> " + "<svg width=\"521px\" height=\"521px\" version=\"1.1\" baseProfile=\"full\" xmlns=\"".concat(SVG_NS, "\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:ev=\"http://www.w3.org/2001/xml-events\">");
  var foot = '</svg>';
  var content = head + inner + foot;
  return content;
}

function Polygon(svg, indices) {
  this.svg = svg;
  this.indices = indices;
  this.zIndex = 0;
}
/**
 * Parse gradient definitions and construct them in the DOM.
 *
 * Both `<linearGradient>` and `<radialGradient>` are supported. All gradients get added to a
 * `<defs>` element that is added as a direct child of the container element.
 *
 * @param {Element} container - The `<svg>` HTML element that the definitions should be added to.
 * @param {(LinearGradientDefinition | RadialGradientDefinition)[]} [gradients] - The gradient definitions.
 */


function setGradientDefinitions(container, gradients) {
  if (!gradients || Object.keys(gradients).length === 0) {
    return;
  }

  var defsContainer = createNode('defs');
  var linearCoordinateAttributes = ['x1', 'x2', 'y1', 'y2'];
  var radialCoordinateAttributes = ['cx', 'cy', 'fr', 'fx', 'fy', 'r'];
  var commonAttributes = ['gradientTransform', 'gradientUnits', 'spreadMethod', 'stops', 'type'];
  var allLinearAttributes = [].concat(linearCoordinateAttributes, commonAttributes);
  var allRadialAttributes = [].concat(radialCoordinateAttributes, commonAttributes);

  var _loop = function _loop() {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        gradientId = _Object$entries$_i[0],
        gradientDefinition = _Object$entries$_i[1];

    var gradient = void 0;

    if (gradientDefinition.type === 'linear') {
      gradient = createNode('linearGradient');
      var unsupportedLinearAttribute = Object.keys(gradientDefinition).find(function (attribute) {
        return !allLinearAttributes.includes(attribute);
      });

      if (unsupportedLinearAttribute) {
        throw new Error("Unsupported linear gradient attribute: '".concat(unsupportedLinearAttribute, "'"));
      } else if (linearCoordinateAttributes.some(function (attributeName) {
        return gradientDefinition[attributeName] !== undefined;
      })) {
        var missingAttributes = linearCoordinateAttributes.filter(function (attributeName) {
          return gradientDefinition[attributeName] === undefined;
        });

        if (missingAttributes.length > 0) {
          throw new Error("Missing coordinate attributes: '".concat(missingAttributes.join(', '), "'"));
        }

        var _iterator2 = _createForOfIteratorHelper(linearCoordinateAttributes),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var attribute = _step2.value;

            if (typeof gradientDefinition[attribute] !== 'string') {
              throw new Error("Type of '".concat(attribute, "' option expected to be 'string'. Instead received type '").concat(typeof gradientDefinition[attribute], "'"));
            }

            setAttribute(gradient, attribute, gradientDefinition[attribute]);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } else if (gradientDefinition.type === 'radial') {
      gradient = createNode('radialGradient');
      var presentCoordinateAttributes = radialCoordinateAttributes.filter(function (attributeName) {
        return gradientDefinition[attributeName] !== undefined;
      });
      var unsupportedRadialAttribute = Object.keys(gradientDefinition).find(function (attribute) {
        return !allRadialAttributes.includes(attribute);
      });

      if (unsupportedRadialAttribute) {
        throw new Error("Unsupported radial gradient attribute: '".concat(unsupportedRadialAttribute, "'"));
      } else if (presentCoordinateAttributes.length > 0) {
        var _iterator3 = _createForOfIteratorHelper(presentCoordinateAttributes),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _attribute = _step3.value;

            if (typeof gradientDefinition[_attribute] !== 'string') {
              throw new Error("Type of '".concat(_attribute, "' option expected to be 'string'. Instead received type '").concat(typeof gradientDefinition[_attribute], "'"));
            }

            setAttribute(gradient, _attribute, gradientDefinition[_attribute]);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    } else {
      throw new Error("Unsupported gradient type: '".concat(gradientDefinition.type, "'"));
    } // Set common attributes


    setAttribute(gradient, 'id', gradientId);

    if (gradientDefinition.gradientUnits !== undefined) {
      if (!['userSpaceOnUse', 'objectBoundingBox'].includes(gradientDefinition.gradientUnits)) {
        throw new Error("Unrecognized value for 'gradientUnits' attribute: '".concat(gradientDefinition.gradientUnits, "'"));
      }

      setAttribute(gradient, 'gradientUnits', gradientDefinition.gradientUnits);
    }

    if (gradientDefinition.gradientTransform !== undefined) {
      if (typeof gradientDefinition.gradientTransform !== 'string') {
        throw new Error("Type of 'gradientTransform' option expected to be 'string'. Instead received type '".concat(typeof gradientDefinition.gradientTransform, "'"));
      }

      setAttribute(gradient, 'gradientTransform', gradientDefinition.gradientTransform);
    }

    if (gradientDefinition.spreadMethod !== undefined) {
      if (!['pad', 'reflect', 'repeat'].includes(gradientDefinition.spreadMethod)) {
        throw new Error("Unrecognized value for 'spreadMethod' attribute: '".concat(gradientDefinition.spreadMethod, "'"));
      }

      setAttribute(gradient, 'spreadMethod', gradientDefinition.spreadMethod);
    }

    if (gradientDefinition.stops !== undefined) {
      if (!Array.isArray(gradientDefinition.stops)) {
        throw new Error("The 'stop' attribute must be an array");
      }

      var _iterator4 = _createForOfIteratorHelper(gradientDefinition.stops),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var stopDefinition = _step4.value;

          if (typeof stopDefinition !== 'object') {
            throw new Error("Each entry in the 'stop' attribute must be an object. Instead received type '".concat(typeof stopDefinition, "'"));
          }

          var stop = createNode('stop');

          if (stopDefinition.offset !== undefined) {
            setAttribute(stop, 'offset', stopDefinition.offset);
          }

          if (stopDefinition['stop-color'] !== undefined) {
            setAttribute(stop, 'stop-color', stopDefinition['stop-color']);
          }

          if (stopDefinition['stop-opacity'] !== undefined) {
            setAttribute(stop, 'stop-opacity', stopDefinition['stop-opacity']);
          }

          gradient.appendChild(stop);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }

    defsContainer.appendChild(gradient);
  };

  for (var _i = 0, _Object$entries = Object.entries(gradients); _i < _Object$entries.length; _i++) {
    _loop();
  }

  container.appendChild(defsContainer);
}
/**
 * The properties of a single SVG mask.
 *
 * @typedef MaskDefinition
 * @property {string} color - The color or gradient to apply to the mask.
 */

/**
 * Parse mask definitions and construct them in the DOM.
 *
 * The `<mask>` element contains a single rectangle that should cover the full extent of the SVG
 * model. The color of this rectangle can be set to single color or a gradient. Anything the mask
 * is applied to will be invisible if under a black pixel, visible if under a white pixel, and
 * partially translucent if under a pixel that is between white and black.
 *
 * Later this could be extended to include custom paths and other shapes, rather than just a single
 * rectangle.
 *
 * @param options - The mask options.
 * @param {Element} options.container - The `<svg>` HTML element that the mask should be added to.
 * @param {Record<string, MaskDefinition>} [options.masks] - The gradient definitions.
 * @param {number} options.height - The height of the SVG container.
 * @param {number} options.width - The width of the SVG container.
 */


function setMaskDefinitions(_ref3) {
  var container = _ref3.container,
      masks = _ref3.masks,
      height = _ref3.height,
      width = _ref3.width;

  if (!masks || Object.keys(masks).length === 0) {
    return;
  }

  for (var _i2 = 0, _Object$entries2 = Object.entries(masks); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        maskId = _Object$entries2$_i[0],
        maskDefinition = _Object$entries2$_i[1];

    var mask = createNode('mask');
    setAttribute(mask, 'id', maskId);
    var maskedRect = createNode('rect'); // Extend mask beyond container to ensure it completely covers the model.
    // The model can extend beyond the container as well.

    setAttribute(maskedRect, 'width', width * 1.5);
    setAttribute(maskedRect, 'height', height * 1.5);
    setAttribute(maskedRect, 'x', "-".concat(Math.floor(width / 4)));
    setAttribute(maskedRect, 'y', "-".concat(Math.floor(height / 4)));
    setAttribute(maskedRect, 'fill', maskDefinition.color);
    mask.appendChild(maskedRect);
    container.appendChild(mask);
  }
}