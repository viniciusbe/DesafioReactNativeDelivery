import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  AdittionalItem,
  AdittionalItemText,
  SubtotalContainer,
  SubtotalTitle,
  SubtotalPriceContainer,
  TotalContainer,
  TotalPrice,
  QuantityContainer,
} from './styles';

interface Params {
  id: number;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  formattedValue: string;
  quantity: number;
}

interface Order {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  total: string;
  image_url: string;
  formattedPrice: string;
  extras: Extra[];
  created_at: string;
  formattedDate: string;
  extrasTotal: number;
}

const OrderDetails: React.FC = () => {
  const [order, setOrder] = useState({} as Order);
  const [extras, setExtras] = useState<Extra[]>([]);

  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const { data } = await api.get<Order>(`/orders/${routeParams.id}`);

      const extrasTotal = data.extras.reduce((acc, current) => {
        return acc + current.quantity * current.value;
      }, 0);

      setOrder({
        ...data,
        total: formatValue((extrasTotal + data.price) * data.quantity),
        formattedDate: format(Date.parse(data.created_at), 'dd/MM/yy', {
          locale: ptBR,
        }),
        formattedPrice: formatValue(data.price),
        extrasTotal,
      });

      setExtras(
        data.extras.map(extra => ({
          ...extra,
          formattedValue: formatValue(extra.value),
        })),
      );
    }

    loadFood();
  }, [routeParams.id]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: order.image_url,
                }}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{order.name}</FoodTitle>
              <FoodDescription>{order.description}</FoodDescription>
              <FoodPricing>{order.formattedPrice}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <AdditionalsContainer>
          <Title>Adicionais</Title>
          {extras.map(extra => (
            <AdittionalItem key={extra.id}>
              <AdittionalItemText>{extra.name} x 2</AdittionalItemText>
              <AdittionalItemText testID={`extra-quantity-${extra.id}`}>
                + {formatValue(extra.quantity * extra.value)}
              </AdittionalItemText>
            </AdittionalItem>
          ))}
        </AdditionalsContainer>
        <SubtotalContainer>
          <SubtotalTitle>Subtotal</SubtotalTitle>
          <QuantityContainer>
            <AdittionalItemText testID="food-quantity">
              {order.quantity} x
            </AdittionalItemText>
          </QuantityContainer>
          <SubtotalPriceContainer>
            <AdittionalItemText testID="food-quantity">
              {formatValue(order.price + order.extrasTotal)}
            </AdittionalItemText>
          </SubtotalPriceContainer>
        </SubtotalContainer>
        <TotalContainer>
          <Title>Total do pedido</Title>
          <TotalPrice testID="cart-total">{order.total}</TotalPrice>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default OrderDetails;
