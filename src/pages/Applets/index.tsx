import Grid from '../../Components/Grid';
import { GridItem } from '../../Components/GridItem';
import CardContainer from '../../Components/CardContaner';

const Applets = () => {
  return (
    <div>
      <Grid>
        <GridItem sm={12} md={6} lg={6} xl={6}>
          <CardContainer>
            <h1>hello</h1>
          </CardContainer>
        </GridItem>
        <GridItem sm={12} md={6} lg={6} xl={6}>
          <CardContainer>
            <h1>hello</h1>
          </CardContainer>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Applets;
