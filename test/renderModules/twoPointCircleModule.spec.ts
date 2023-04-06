import { expect } from 'chai';

import { Vector2 } from '@daign/math';
import { PresentationNode, View } from '@daign/2d-pipeline';
import { StyleSelectorChain, StyleSheet } from '@daign/style-sheets';
import { GraphicStyle, TwoPointCircle } from '@daign/2d-graphics';

import { twoPointCircleModule } from '../../lib/renderModules';
import { TikzRendererFactory } from '../../lib';

describe( 'twoPointCircleModule', (): void => {
  describe( 'callback', (): void => {
    it( 'should return the command for drawing a circle', (): void => {
      // Arrange
      const view = new View();
      const circle = new TwoPointCircle();
      circle.center = new Vector2( 1, 2 );
      circle.circlePoint = new Vector2( 1, 5 );
      const presentationNode = new PresentationNode( view, circle );

      const selectorChain = new StyleSelectorChain();

      const styleSheet = new StyleSheet<GraphicStyle>();
      styleSheet.parseFromString( `.circle {
        stroke: #000;
      }`, GraphicStyle );
      const rendererFactory = new TikzRendererFactory();
      const tikzRenderer = rendererFactory.createRenderer( styleSheet );

      // Act
      const result = twoPointCircleModule.callback( presentationNode, selectorChain, tikzRenderer );

      // Assert
      expect( result ).to.equal(
        '\\definecolor{temp}{HTML}{000}\n\\draw[temp] (1,2) circle (3);\n'
      );
    } );
  } );
} );
