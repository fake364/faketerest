import Node from './Node';

export default class CircularLinkedNode<T> extends Node<T> {
	private _nextNode: CircularLinkedNode<T>;

	public static initializeCircleList<T>(
		itemsArr: T[],
		index: number,
		prevNode?: CircularLinkedNode<T>,
		root?: CircularLinkedNode<T>
	): CircularLinkedNode<T> {
		const isArrayOver = index === itemsArr.length;
		const customIndex = isArrayOver ? 0 : index;
		if (isArrayOver) {
			prevNode.nextNode = root;
			return root;
		}
		const circularNode = new CircularLinkedNode<T>(itemsArr[customIndex]);
		if (prevNode) {
			prevNode.nextNode = circularNode;
		}

		return this.initializeCircleList<T>(
			itemsArr,
			index + 1,
			circularNode,
			index === 0 ? circularNode : root
		);
	}

	get nextNode(): CircularLinkedNode<T> {
		return this._nextNode;
	}

	set nextNode(value: CircularLinkedNode<T>) {
		this._nextNode = value;
	}
}
