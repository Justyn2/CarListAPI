import { ICarRowProps } from 'src/Containers/CarRow';
import { filter } from 'src/Types';

export default function CarSorter(currentFilter:filter) {
    return (x:ICarRowProps,y:ICarRowProps) => {
        if(filter){
            switch(currentFilter){
            case filter.makeasc:
            return x.make.localeCompare(y.make);
            case filter.makedesc:
            return -x.make.localeCompare(y.make);
            case filter.modelasc:
            return x.model.localeCompare(y.model);
            case filter.modeldesc:
            return -x.model.localeCompare(y.model);
            case filter.trimasc:
            return x.trim.localeCompare(y.trim);
            case filter.trimdesc:
            return -x.trim.localeCompare(y.trim);
            case filter.yearasc:
            return x.year.localeCompare(y.year);
            case filter.yeardesc:
            return -x.year.localeCompare(y.year);
            }
        }
        return 0;
    }
}