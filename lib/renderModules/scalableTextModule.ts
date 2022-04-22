import { PresentationNode } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';
import { ScalableText } from '@daign/2d-graphics';

import { TikzRenderer } from '../tikzRenderer';
import { TikzRenderModule } from '../tikzRenderModule';

export const scalableTextModule = new TikzRenderModule(
  ScalableText,
  (
    currentNode: PresentationNode,
    selectorChain: StyleSelectorChain,
    renderer: TikzRenderer
  ): string => {
    const text = currentNode.sourceNode as ScalableText;
    selectorChain.addSelector( text.styleSelector );

    const anchor = text.getAnchorTransformed( currentNode.projectNodeToView )
      .round( renderer.precision );
    let fontSize = text.getFontSizeTransformed( currentNode.projectNodeToView );
    const factor = Math.pow( 10, renderer.precision );
    fontSize = Math.round( ( fontSize + Number.EPSILON ) * factor ) / factor;

    const tikzShape = `(${anchor.x},${anchor.y}) node[anchor=${text.textAnchor}] {${text.content}}`;
    let tikzCommand = renderer.applyStyle( tikzShape, selectorChain );
    tikzCommand = `\\${fontSize}\n${tikzCommand}`;
    return tikzCommand;
  }
);
