import React from 'react';
import {
	MdRemoveCircleOutline,
	MdAddCircleOutline,
	MdDelete,
} from 'react-icons/md';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, removeFromCart, updateAmountRequest, total }) {
	function increment(product) {
		updateAmountRequest(product.id, product.amount + 1);
	}

	function decrement(product) {
		updateAmountRequest(product.id, product.amount - 1);
	}

	return (
		<Container>
			<ProductTable>
				<thead>
					<tr>
						<th />
						<th>Produto</th>
						<th>Quantidade</th>
						<th>Subtotal</th>
						<th />
					</tr>
				</thead>

				<tbody>
					{cart.map(product => (
						<tr key={product.id}>
							<td>
								<img src={product.image} alt={product.title} />
							</td>
							<td>
								<strong>{product.title}</strong>
								<span>{product.priceFormatted}</span>
							</td>

							<td>
								<div>
									<button type="button" onClick={() => decrement(product)}>
										<MdRemoveCircleOutline size={20} color="#7159c1" />
									</button>

									<input type="number" readOnly value={product.amount} />

									<button type="button" onClick={() => increment(product)}>
										<MdAddCircleOutline size={20} color="#7159c1" />
									</button>
								</div>
							</td>

							<td>
								<strong>{product.subtotal}</strong>
							</td>

							<td>
								<button
									type="button"
									onClick={() => removeFromCart(product.id)}
								>
									<MdDelete size={20} color="#7159c1" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</ProductTable>

			<footer>
				<button type="button">Finalizar Pedido</button>

				<Total>
					<span>Total</span>
					<strong>{total}</strong>
				</Total>
			</footer>
		</Container>
	);
}

const mapStateToProps = state => ({
	cart: state.cart.map(product => ({
		...product,
		subtotal: formatPrice(product.price * product.amount),
	})),
	total: formatPrice(
		state.cart.reduce((total, { price, amount }) => {
			return total + price * amount;
		}, 0)
	),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
