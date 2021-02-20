import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  padding: 40px 24px 20px;
  background: #c72828;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  margin-top: -40px;
`;

export const FoodsContainer = styled.View`
  padding: 0 24px;
`;

export const Food = styled.View`
  background: #f0f0f5;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const FoodImageContainer = styled.View`
  background: #ffb84d;
  overflow: hidden;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

export const FoodContent = styled.View`
  padding: 16px 24px;
`;

export const FoodTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
  text-align: right;
  color: #3d3d4d;
`;

export const FoodDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 25px;
  margin-top: 8px;
  color: #3d3d4d;
  text-align: right;
`;

export const FoodPricing = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 24px;
  line-height: 28px;
  color: #6c6c80;
  margin-top: 8px;
  font-weight: 600;
  align-self: flex-end;
`;

export const Title = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #3d3d4d;
`;

export const AdditionalsContainer = styled.View`
  padding: 0 24px;
  margin-top: 16px;
`;

export const AdittionalItem = styled.View`
  background: #f0f0f5;
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px;
  margin-top: 8px;
`;

export const AdittionalItemText = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #6c6c80;
`;

export const SubtotalContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 24px;
`;
export const SubtotalTitle = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #3d3d4d;
`;

export const QuantityContainer = styled.View`
  margin-left: auto;
  background: #f0f0f5;
  border-radius: 8px;
  padding: 10px 15px;
`;

export const SubtotalPriceContainer = styled.View`
  margin-left: 16px;
  background: #f0f0f5;
  border-radius: 8px;
  padding: 10px 15px;
`;

export const TotalContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  margin-top: auto;
`;

export const TotalPrice = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  align-self: flex-end;
  color: #39b100;
`;
