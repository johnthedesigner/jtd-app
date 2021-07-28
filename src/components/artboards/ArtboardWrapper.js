import React from "react";
import PropTypes from "prop-types";
import idx from "idx";
import Color from "color";
import _ from "lodash";
import { mouseTrap } from "react-mousetrap";

import { mapArtboard } from "./artboardUtils";
import AdjustmentsPanel from "./adjustments/AdjustmentsPanel";
import Artboard from "./Artboard";
import ActionBars from "./ActionBars";
import Layer from "../layers/Layer";
import TextLayerEditor from "../layers/TextLayerEditor";
import ResizeControl from "../layers/ResizeControl";
import { scaleDimension } from "./artboardUtils";
import { colorsWithFallback } from "../../utils/colorUtils";
import ImagePicker from "../layers/ImagePicker";

class ArtboardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleFactor: 1,
      shiftKey: false,
      isScaled: false,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    // Get the dimensions of our artboards-wrapper
    let { artboardId } = this.props;
    let wrapper = document.getElementById(`artboard-wrapper-${artboardId}`);
    let width = wrapper.clientWidth * (0.8 / 1); // Limit artboard to 8/9 column
    let height = wrapper.clientHeight;
    // Determine correct artboard scale factor and store in component state
    this.setState({
      scaleFactor: (_.min([width, height]) * 0.96) / 1000,
      isScaled: true,
    });
  }

  render() {
    const {
      addLayer,
      adjustLayers,
      artboards,
      artboardId,
      bumpLayers,
      deselectLayers,
      dragLayers,
      enableTextEditor,
      highlightLayer,
      moveLayers,
      rotateLayer,
      scaleLayer,
      selectLayer,
      toggleImagePicker,
      updateText,
    } = this.props;

    const mappedArtboard = mapArtboard(artboards[artboardId]);

    const EditableTextLayer = (props) => {
      if (mappedArtboard.editableTextLayer) {
        let textLayer = _.filter(mappedArtboard.layers, (layer) => {
          // Show editable text layer
          return layer.id === mappedArtboard.editableTextLayer;
        });
        return (
          <TextLayerEditor
            enableTextEditor={enableTextEditor}
            key={textLayer.id}
            layer={textLayer[0]}
            isScaled={this.state.isScaled}
            scaleFactor={this.state.scaleFactor}
            updateText={updateText}
          />
        );
      } else {
        return null;
      }
    };

    const adjustments = idx(mappedArtboard, (_) => _.selection.adjustments);

    const selectionDimensions = idx(
      mappedArtboard,
      (_) => _.selection.dimensions
    );

    return (
      <div
        className="artboard__wrapper"
        id={`artboard-wrapper-${artboardId}`}
        onClick={() => {
          deselectLayers(mappedArtboard.id);
        }}
      >
        <Artboard
          {...mappedArtboard}
          highlightLayer={highlightLayer}
          key={mappedArtboard.id}
          isScaled={this.state.isScaled}
          scaleFactor={this.state.scaleFactor}
          deselectLayers={deselectLayers}
        >
          <div className="artboard__svg-wrapper">
            <svg
              width={scaleDimension(1000, this.state.scaleFactor)}
              height={scaleDimension(1000, this.state.scaleFactor)}
              viewBox="0 0 1000 1000"
            >
              <defs>
                {_.map(mappedArtboard.layers, (layer) => {
                  let { fill } = layer.adjustments;
                  if (fill === undefined) return null;
                  let fillColors = colorsWithFallback(
                    fill.color,
                    fill.gradient
                  );
                  let fillConfig;
                  if (fill.type === "gradient") {
                    fillConfig = fillColors.gradient;
                  } else {
                    fillConfig = {
                      angle: 0,
                      start: fillColors.solid,
                      end: fillColors.solid,
                    };
                  }

                  return (
                    <linearGradient
                      key={layer.id}
                      id={`gradient${layer.id}`}
                      x1="0%"
                      x2="0%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop
                        className="stop1"
                        offset="0%"
                        stopColor={Color(fillConfig.start).hex()}
                      />
                      <stop
                        className="stop2"
                        offset="100%"
                        stopColor={Color(fillConfig.end).hex()}
                      />
                    </linearGradient>
                  );
                })}
              </defs>
              {_.map(
                _.orderBy(mappedArtboard.layers, "order"),
                (layer, index) => {
                  return (
                    <Layer
                      dragLayers={dragLayers}
                      highlightLayer={highlightLayer}
                      key={layer.id}
                      layer={layer}
                      selectLayer={selectLayer}
                      isScaled={this.state.isScaled}
                      scaleFactor={this.state.scaleFactor}
                      scaleLayer={scaleLayer}
                    />
                  );
                }
              )}
            </svg>
            <ResizeControl
              dragLayers={dragLayers}
              dimensions={mappedArtboard.selection.dimensions}
              enableTextEditor={enableTextEditor}
              isActive={mappedArtboard.selection.isActive}
              layers={mappedArtboard.layers}
              scaleFactor={this.state.scaleFactor}
              scaleLayer={scaleLayer}
              selections={mappedArtboard.selections}
              selectLayer={selectLayer}
            />
            <EditableTextLayer />
          </div>
          <div className="artboard__action-bar">
            <ActionBars
              adjustments={adjustments}
              adjustLayers={adjustLayers}
              addLayer={addLayer}
              buttonFill={"black"}
              layerIds={mappedArtboard.selection.layers}
              moveLayers={moveLayers}
              toggleImagePicker={toggleImagePicker}
            />
          </div>
          <AdjustmentsPanel
            adjustments={adjustments}
            adjustLayers={adjustLayers}
            bumpLayers={bumpLayers}
            dimensions={selectionDimensions}
            projectColors={mappedArtboard.projectColors}
            rotateLayer={rotateLayer}
            scaleLayer={scaleLayer}
          />
          <ImagePicker
            addLayer={addLayer}
            showImagePicker={mappedArtboard.showImagePicker}
            toggleImagePicker={toggleImagePicker}
          />
        </Artboard>
      </div>
    );
  }
}

ArtboardWrapper.propTypes = {
  artboards: PropTypes.object.isRequired,
  bumpLayers: PropTypes.func.isRequired,
  artboardId: PropTypes.string.isRequired,
  copyLayers: PropTypes.func.isRequired,
  deleteLayers: PropTypes.func.isRequired,
  deselectLayers: PropTypes.func.isRequired,
  pasteLayers: PropTypes.func.isRequired,
};

// Wrap EditorView in mouseTrap to track key events
export default mouseTrap(ArtboardWrapper);
