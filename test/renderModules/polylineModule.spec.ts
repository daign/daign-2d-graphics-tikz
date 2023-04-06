import { expect } from 'chai';

import { Vector2 } from '@daign/math';
import { PresentationNode, View } from '@daign/2d-pipeline';
import { StyleSelectorChain, StyleSheet } from '@daign/style-sheets';
import { GraphicStyle, Polyline } from '@daign/2d-graphics';

import { polylineModule } from '../../lib/renderModules';
import { TikzRendererFactory } from '../../lib';

describe( 'polylineModule', (): void => {
  describe( 'callback', (): void => {
    it( 'should return the command for drawing a polyline', (): void => {
      // Arrange
      const view = new View();
      const polyline = new Polyline();
      polyline.points.elements = [ new Vector2( 1, 2 ), new Vector2( 3, 4 ), new Vector2( 5, 6 ) ];
      const presentationNode = new PresentationNode( view, polyline );

      const selectorChain = new StyleSelectorChain();

      const styleSheet = new StyleSheet<GraphicStyle>();
      styleSheet.parseFromString( `.polyline {
        stroke: #000;
      }`, GraphicStyle );
      const rendererFactory = new TikzRendererFactory();
      const tikzRenderer = rendererFactory.createRenderer( styleSheet );

      // Act
      const result = polylineModule.callback( presentationNode, selectorChain, tikzRenderer );

      // Assert
      expect( result ).to.equal(
        '\\definecolor{temp}{HTML}{000}\n\\draw[temp] (1,2) -- (3,4) -- (5,6);\n'
      );
    } );
  } );
} );
