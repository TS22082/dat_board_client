import Grid from '../../Components/Grid';
import { GridItem } from '../../Components/GridItem';
import CardContainer from '../../Components/CardContaner';
import useAppletsData from './useAppletsData.ts';

const Applets = () => {
  const { widgets } = useAppletsData();

  return (
    <div>
      <Grid>
        {widgets.map((widget) => (
          <GridItem sm={12} md={6} lg={6} xl={6}>
            <CardContainer>
              <h2>{widget.title}</h2>
              <p>{widget.description}</p>
            </CardContainer>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default Applets;
