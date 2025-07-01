import React from 'react';
import GrediantButton from './GrediantButton';

const NoFoods = ({title , description , path}) => {
    return (
        <div className="bg-primary/10 dark:bg-base-200 flex flex-col border border-primary/30 items-center justify-center p-6 md:p-10 rounded-xl min-h-[calc(100vh-285px)] gap-3 text-center mx-auto max-w-5xl shadow shadow-primary hover:shadow-md duration-500 transition-all">
            <img src="/cross.svg" alt="" className="w-24 md:w-40" />
            <h2 className="text-2xl md:text-4xl font-semibold text-red-600">
              {title}
            </h2>
            <p> {description} </p>
            {
              path && <GrediantButton text={'Add Food Page'} path={path}/>
            }
          </div>
    );
};

export default NoFoods;