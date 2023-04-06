import { expect } from 'chai';

import { Vector2 } from '@daign/math';
import { PresentationNode, View } from '@daign/2d-pipeline';
import { StyleSelectorChain, StyleSheet } from '@daign/style-sheets';
import { GraphicStyle, Line } from '@daign/2d-graphics';

import { lineModule } from '../../lib/renderModules';
import { TikzRendererFactory } from '../../lib';

describe( 'lineModule', (): void => {
  describe( 'callback', (): void => {
    it( 'should return the command for drawing a line', (): void => {
      // Arrange
      const view = new View();
      const line = new Line();
      line.start = new Vector2( 1, 2 );
      line.end = new Vector2( 3, 4 );
      const presentationNode = new PresentationNode( view, line );

      const selectorChain = new StyleSelectorChain();

      const styleSheet = new StyleSheet<GraphicStyle>();
      styleSheet.parseFromString( `.line {
        stroke: #000;
      }`, GraphicStyle );
      const rendererFactory = new TikzRendererFactory();
      const tikzRenderer = rendererFactory.createRenderer( styleSheet );

      // Act
      const result = lineModule.callback( presentationNode, selectorChain, tikzRenderer );

      // Assert
      expect( result ).to.equal(
        '\\definecolor{temp}{HTML}{000}\n\\draw[temp] (1,2) -- (3,4);\n'
      );
    } );
  } );
} );
