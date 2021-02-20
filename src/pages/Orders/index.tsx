import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  FoodDate,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  total: string;
  thumbnail_url: string;
  extras: Extra[];
  created_at: string;
  formattedDate: string;
}

interface Extra {
  value: number;
  quantity: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);

  const { navigate } = useNavigation();

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const { data } = await api.get<Food[]>('/orders');

      setOrders(
        data.map(order => {
          const extrasTotal = order.extras.reduce((acc, current) => {
            return acc + current.quantity * current.value;
          }, 0);

          return {
            ...order,
            total: formatValue((extrasTotal + order.price) * order.quantity),
            formattedDate: format(Date.parse(order.created_at), 'dd/MM/yy', {
              locale: ptBR,
            }),
          };
        }),
      );
    }

    loadOrders();
  }, []);

  async function handleNavigate(id: number): Promise<void> {
    navigate(`OrderDetails`, { id });
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders.reverse()}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food
              key={item.id}
              activeOpacity={0.6}
              onPress={() => handleNavigate(item.id)}
            >
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.total}</FoodPricing>
                <FoodDate>{item.formattedDate}</FoodDate>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
