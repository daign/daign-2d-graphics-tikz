import { Vector2 } from '@daign/math';
import { ITargetContext } from '@daign/2d-graphics';

/**
 * Class for a TikZ context.
 */
export class TikzContext implements ITargetContext {
  private _size: Vector2 = new Vector2( 1, 1 );
  public domNode: any = null;

  /**
   * Get the size of the TikZ drawing area.
   * @returns - The size of the TikZ drawing area.
   */
  public get size(): Vector2 {
    return this._size;
  }

  /**
   * Set the size of the TikZ drawing area.
   * @param size - The size of the TikZ drawing area.
   */
  public set size( size: Vector2 ) {
    this._size.copy( size );
  }

  /**
   * Constructor.
   */
  public constructor() {}
}
