import { PresentationNode } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';
import { Line } from '@daign/2d-graphics';

import { TikzRenderer } from '../tikzRenderer';
import { TikzRenderModule } from '../tikzRenderModule';

export const lineModule = new TikzRenderModule(
  Line,
  (
    currentNode: PresentationNode,
    selectorChain: StyleSelectorChain,
    renderer: TikzRenderer
  ): string => {
    const line = currentNode.sourceNode as Line;
    selectorChain.addSelector( line.styleSelector );

    const startPoint = line.getStartTransformed( currentNode.projectNodeToView )
      .round( renderer.precision );
    const endPoint = line.getEndTransformed( currentNode.projectNodeToView )
      .round( renderer.precision );

    const tikzShape = `(${startPoint.x},${startPoint.y}) -- (${endPoint.x},${endPoint.y})`;
    const tikzCommand = renderer.applyStyle( tikzShape, selectorChain );
    return tikzCommand;
  }
);
