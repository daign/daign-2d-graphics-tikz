import { expect } from 'chai';

import { View } from '@daign/2d-pipeline';
import { GraphicStyle, Line } from '@daign/2d-graphics';
import { StyleSheet } from '@daign/style-sheets';

import { TikzRendererFactory } from '../lib';

describe( 'TikzRenderer', (): void => {
  describe( 'render', (): void => {
    it( 'should return the TikZ document', (): void => {
      // Arrange
      const styleSheet = new StyleSheet<GraphicStyle>();
      const rendererFactory = new TikzRendererFactory();
      const tikzRenderer = rendererFactory.createRenderer( styleSheet );

      const node = new Line();
      const view = new View();
      view.mountNode( node );

      // Act
      const result = tikzRenderer.render( view );

      // Assert
      expect( result ).to.equal( '\\begin{tikzpicture}\n\\end{tikzpicture}' );
    } );
  } );
} );
