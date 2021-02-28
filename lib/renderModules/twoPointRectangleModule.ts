import { PresentationNode } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';
import { TwoPointRectangle } from '@daign/2d-graphics';

import { TikzRenderer } from '../tikzRenderer';
import { TikzRenderModule } from '../tikzRenderModule';

export const twoPointRectangleModule = new TikzRenderModule(
  TwoPointRectangle,
  (
    currentNode: PresentationNode,
    selectorChain: StyleSelectorChain,
    renderer: TikzRenderer
  ): string => {
    const rectangle = currentNode.sourceNode as TwoPointRectangle;
    selectorChain.addSelector( rectangle.styleSelector );

    const startPoint = rectangle.getStartTransformed( currentNode.projectNodeToView )
      .round( renderer.precision );
    const endPoint = rectangle.getEndTransformed( currentNode.projectNodeToView )
      .round( renderer.precision );

    const tikzShape = `(${startPoint.x},${startPoint.y}) rectangle (${endPoint.x},${endPoint.y})`;
    const tikzCommand = renderer.applyStyle( tikzShape, selectorChain );
    return tikzCommand;
  }
);
