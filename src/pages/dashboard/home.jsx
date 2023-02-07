import React from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { ChartBarIcon } from "@heroicons/react/24/solid";

export function Home() {
  return (
    
    <div className="mt-12 " >
        
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <StatisticsCard
              key={'Cow Milk Collection'}
              title={'Cow Milk Collection'}
              value={'100 lit'}
              icon={React.createElement(ChartBarIcon, {
                  className: "w-6 h-6 text-white",
              })}
              footer={
                  <Typography className="font-normal text-blue-gray-600">
                      <strong className="text-green-500">20%</strong>
                      &nbsp;than yesterday
                  </Typography>
              }
          />

          <StatisticsCard
              key={'Cow Milk Sale'}
              title={'Cow Milk Sale'}
              value={'50 lit'}
              icon={React.createElement(ChartBarIcon, {
                  className: "w-6 h-6 text-white",
              })}
              footer={
                  <Typography className="font-normal text-blue-gray-600">
                      <strong className="text-green-500">15%</strong>
                      &nbsp;than yesterday
                  </Typography>
              }
          />

          <StatisticsCard
              key={'Buffalo Milk Collection'}
              title={'Buffalo Milk Collection'}
              value={'70 lit'}
              icon={React.createElement(ChartBarIcon, {
                  className: "w-6 h-6 text-white",
              })}
              footer={
                  <Typography className="font-normal text-blue-gray-600">
                      <strong className="text-green-500">10%</strong>
                      &nbsp;than yesterday
                  </Typography>
              }
          />

          <StatisticsCard
              key={'Buffalo Milk Sale'}
              title={'Buffalo Milk Sale'}
              value={'20 lit'}
              icon={React.createElement(ChartBarIcon, {
                  className: "w-6 h-6 text-white",
              })}
              footer={
                  <Typography className="font-normal text-blue-gray-600">
                      <strong className="text-green-500">5%</strong>
                      &nbsp;than yesterday
                  </Typography>
              }
          />
          

      </div>
    </div>
  );
}

export default Home;
