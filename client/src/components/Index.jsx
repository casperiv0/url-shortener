import React, { useState } from 'react';
import axios from 'axios';
import { public_url } from '../config';

export default function Index() {
  const [full, setFull] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      full,
      slug,
    };

    setError('');
    handleRequest('/api', 'POST', data)
      .then((res) => {
        if (res.data.status === 'error') return setError(res.data.msg);

        if (res.data.status === 'success' && res.data.msg === 'Added') {
          setResult({ full: res.data.url.full, slug: res.data.url.slug });
          document.querySelector('.modal').classList.add('active');
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className='container'>
      <SuccessModal url={result} />
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          {error ? <div className='error'> {error} </div> : null}
        </div>
        <div className='form-group'>
          <label htmlFor='full'>Enter Full URL</label>
          <input
            type='url'
            name='full'
            id='full'
            value={full}
            className='form-input'
            onChange={(e) => setFull(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='slug'>Enter Slug (Optional)</label>
          <input
            type='text'
            name='slug'
            id='slug'
            value={slug}
            className='form-input'
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <button className='submit-btn' type='submit'>
            Create Short url
          </button>
        </div>
      </form>
    </div>
  );
}

const SuccessModal = ({ url }) => {
  const closeModal = () => {
    document.querySelector('.modal').classList.remove('active');
  };

  const copy = () => {
    window.navigator.clipboard
      .writeText(`${public_url}/${url.slug}`)
      .then(() => {
        document.querySelector('.copy-btn').textContent = 'Copied!';
      })
      .then(() => {
        setTimeout(() => {
          document.querySelector('.copy-btn').textContent = 'Copy Link';
        }, 2000);
      });
  };

  return (
    <div className='modal'>
      <div className='modal-header'>
        <h3>Success!</h3>
        <button onClick={closeModal} className='close-modal'>
          &times;
        </button>
      </div>
      <div className='modal-body'>
        <h2>Successfully created short URL for {url.full}!</h2>
        <button onClick={copy} className='copy-btn'>
          Copy Link
        </button>
        <em>Or</em>
        <a
          href={`${public_url}/${url.slug}`}>{`${public_url}/${url.slug}`}</a>
      </div>
    </div>
  );
};

export const handleRequest = (path, method, data) => {
  return axios({
    url: `http://localhost:3001${path}`,
    method,
    data: data ? data : null,
  });
};
