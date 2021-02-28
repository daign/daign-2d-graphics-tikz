import { PresentationNode } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';
import { Text } from '@daign/2d-graphics';

import { TikzRenderer } from '../tikzRenderer';
import { TikzRenderModule } from '../tikzRenderModule';

export const textModule = new TikzRenderModule(
  Text,
  (
    currentNode: PresentationNode,
    selectorChain: StyleSelectorChain,
    renderer: TikzRenderer
  ): string => {
    const text = currentNode.sourceNode as Text;
    selectorChain.addSelector( text.styleSelector );

    const anchor = text.getAnchorTransformed( currentNode.projectNodeToView )
      .round( renderer.precision );

    const tikzShape = `(${anchor.x},${anchor.y}) node[anchor=${text.textAnchor}] {${text.content}}`;
    const tikzCommand = renderer.applyStyle( tikzShape, selectorChain );
    return tikzCommand;
  }
);
