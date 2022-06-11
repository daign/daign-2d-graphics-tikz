import { expect } from 'chai';

import { PresentationNode, View } from '@daign/2d-pipeline';
import { StyleSelectorChain, StyleSheet } from '@daign/style-sheets';
import { GraphicStyle, Group } from '@daign/2d-graphics';

import { groupModule } from '../../lib/renderModules';
import { TikzRendererFactory } from '../../lib';

describe( 'groupModule', (): void => {
  describe( 'callback', (): void => {
    it( 'should return an empty string for an empty group node', (): void => {
      // Arrange
      const view = new View();
      const groupNode = new Group();
      const presentationNode = new PresentationNode( view, groupNode );

      const selectorChain = new StyleSelectorChain();

      const styleSheet = new StyleSheet<GraphicStyle>();
      const rendererFactory = new TikzRendererFactory();
      const tikzRenderer = rendererFactory.createRenderer( styleSheet );

      // Act
      const result = groupModule.callback( presentationNode, selectorChain, tikzRenderer );

      // Assert
      expect( result ).to.equal( '' );
    } );
  } );
} );
