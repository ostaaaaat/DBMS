import { Container, Grid } from 'semantic-ui-react';
import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import Product from './Product';


export default class ProductsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: props.products };
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps)
            this.setState({ products: this.props.products })
    }

    render() {
        let grid = [];
        let row = []
        this.state.products.forEach(element => {
            row.push((<Grid.Column>{getCard(element)}</Grid.Column>));
            if (row.length === 3) {
                grid.push((<Grid.Row>{row}</Grid.Row>))
                row = []
            }
        });
        grid.push((<Grid.Row>{row}</Grid.Row>))


        return (
            <Grid columns={3}>{grid}</Grid>
        );
    }
}

function getCard(product) {
    return (<Product trigger={getGrid(product)} productId={product.id} />
    );
}


function getGrid(product) {
    return (
    <div className='card'>
    <Card >
        <Image className="photo_catalog" src={product.photo} size='small' />
        <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Description>{product.price} ₽</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button />
        </Card.Content>
    </Card>
    </div>)
}
function Button() {
    return (
        <button className='button' onClick={e => e.stopPropagation()}>Добавить в корзину</button>
    )
}