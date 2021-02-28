import { PresentationNode } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';
import { TwoPointCircle } from '@daign/2d-graphics';

import { TikzRenderer } from '../tikzRenderer';
import { TikzRenderModule } from '../tikzRenderModule';

export const twoPointCircleModule = new TikzRenderModule(
  TwoPointCircle,
  (
    currentNode: PresentationNode,
    selectorChain: StyleSelectorChain,
    renderer: TikzRenderer
  ): string => {
    const circle = currentNode.sourceNode as TwoPointCircle;
    selectorChain.addSelector( circle.styleSelector );

    const center = circle.getCenterTransformed( currentNode.projectNodeToView )
      .round( renderer.precision );

    let radius = circle.getRadiusTransformed( currentNode.projectNodeToView );
    const factor = Math.pow( 10, renderer.precision );
    radius = Math.round( ( radius + Number.EPSILON ) * factor ) / factor;

    const tikzShape = `(${center.x},${center.y}) circle (${radius})`;
    const tikzCommand = renderer.applyStyle( tikzShape, selectorChain );
    return tikzCommand;
  }
);
