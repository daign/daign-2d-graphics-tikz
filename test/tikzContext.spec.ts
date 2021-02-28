import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { TikzContext } from '../lib';

describe( 'TikzContext', (): void => {
  describe( 'setter size', (): void => {
    it( 'should set the size', (): void => {
      // Arrange
      const tikzContext = new TikzContext();

      // Act
      tikzContext.size = new Vector2( 1, 2 );

      // Assert
      expect( tikzContext.size.equals( new Vector2( 1, 2 ) ) ).to.be.true;
    } );
  } );
} );
