import { Vector2 } from '@daign/math';
import { PresentationNode } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';
import { Polyline } from '@daign/2d-graphics';

import { TikzRenderer } from '../tikzRenderer';
import { TikzRenderModule } from '../tikzRenderModule';

export const polylineModule = new TikzRenderModule(
  Polyline,
  (
    currentNode: PresentationNode,
    selectorChain: StyleSelectorChain,
    renderer: TikzRenderer
  ): string => {
    const polyline = currentNode.sourceNode as Polyline;
    selectorChain.addSelector( polyline.styleSelector );

    const points = polyline.getPointsTransformed( currentNode.projectNodeToView );
    const tikzShape = points.map( ( p: Vector2 ): string => {
      p.round( renderer.precision );
      return `(${p.x},${p.y})`;
    } ).join( ' -- ' );
    const tikzCommand = renderer.applyStyle( tikzShape, selectorChain );
    return tikzCommand;
  }
);
