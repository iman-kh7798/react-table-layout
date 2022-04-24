import React, { useEffect } from 'react';
import { Grid, Skeleton, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Pagination from './components/Pagination';
import { TABLE_TAKE } from './helpers/variables';
import { arrayMaker } from './helpers/utility';
const TableLayout = ({
  tableItems,
  data,
  customs,
  total,
  loadData,
  loading,
}) => {
  const [params] = useSearchParams();
  const page = +params.get('page');

  useEffect(() => {
    if (page) {
      const skip = (page - 1) * TABLE_TAKE;
      loadData({ take: TABLE_TAKE, skip: skip });
    } else {
      loadData({ take: TABLE_TAKE, skip: 0 });
    }
  }, [page]);

  const renderHead = () => {
    return tableItems.map((val, index) => <th key={index}>{val.fa_title}</th>);
  };

  const renderBody = () => {
    return loading ? (
      arrayMaker(14).map((v, i) => (
        <tr key={i}>
          {tableItems.map((val, i) => (
            <td key={i}>
              <Skeleton />
            </td>
          ))}
        </tr>
      ))
    ) : data && data.length ? (
      data.map((data, index) => (
        <tr key={index}>
          {Object.keys(data).map((v, i) => (
            <td key={i}>
              {Object.keys(customs).includes(v) ? customs[v](data[v]) : data[v]}
            </td>
          ))}
          {tableItems.filter(v => v.title === 'menu').length && (
            <td>{customs['menu'](data)}</td>
          )}
        </tr>
      ))
    ) : (
      <tr></tr>
    );
  };
  return (
    <>
      <div className='table table--class-marks'>
        <table>
          <thead>
            <tr>{renderHead()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
        {data && !data.length && (
          <Typography
            display='flex'
            justifyContent='center'
            sx={{ mt: 10, pb: 20 }}
            variant='h1'
            className='table-nodata'>
            اطلاعاتی جهت نمایش وجود ندارد
          </Typography>
        )}
      </div>
      {!loading && !!data?.length && (
        <Grid sx={{ mt: 4 }}>
          <Pagination total={total} take={TABLE_TAKE} />
        </Grid>
      )}
    </>
  );
};

export default TableLayout;
