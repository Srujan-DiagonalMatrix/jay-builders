import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ProjectGallery } from '../components/ProjectGallery';

it('renders the supplied Roofing & Exterior thumbnail without a binary-file dependency', () => {
  render(<ProjectGallery />);

  const thumbnail = screen.getByAltText(
    'Roofing and exterior renovation before and after',
  );

  const source = thumbnail.getAttribute('src') ?? '';
  const decoded = Buffer.from(source.split(',')[1], 'base64');

  expect(source).toMatch(/^data:image\/png;base64,/);
  expect(decoded.subarray(0, 8)).toEqual(
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  );
  expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([
    1536,
    1024,
  ]);
  expect(thumbnail).toHaveAttribute('width', '1536');
  expect(thumbnail).toHaveAttribute('height', '1024');
});

it('renders the supplied Rear Extension thumbnail without a binary-file dependency', () => {
  render(<ProjectGallery />);

  const thumbnail = screen.getByAltText(
    'Rear extension before and after',
  );

  const source = thumbnail.getAttribute('src') ?? '';
  const decoded = Buffer.from(source.split(',')[1], 'base64');

  expect(source).toMatch(/^data:image\/png;base64,/);
  expect(decoded.subarray(0, 8)).toEqual(
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  );
  expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([
    1573,
    1000,
  ]);
  expect(thumbnail).toHaveAttribute('width', '1573');
  expect(thumbnail).toHaveAttribute('height', '1000');
});

it('renders the supplied Kitchen Transformation thumbnail without a binary-file dependency', () => {
  render(<ProjectGallery />);

  const thumbnail = screen.getByAltText(
    'Kitchen transformation before and after',
  );

  const source = thumbnail.getAttribute('src') ?? '';
  const decoded = Buffer.from(source.split(',')[1], 'base64');

  expect(source).toMatch(/^data:image\/png;base64,/);
  expect(decoded.subarray(0, 8)).toEqual(
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  );
  expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([
    1536,
    1024,
  ]);
  expect(thumbnail).toHaveAttribute('width', '1536');
  expect(thumbnail).toHaveAttribute('height', '1024');
});

it('renders the Driveway & Landscaping thumbnail without a binary-file dependency', () => {
  render(<ProjectGallery />);

  const thumbnail = screen.getByAltText(
    'Driveway and landscaping before and after',
  );

  const source = thumbnail.getAttribute('src') ?? '';
  const decoded = Buffer.from(source.split(',')[1], 'base64');

  expect(source).toMatch(/^data:image\/png;base64,/);
  expect(decoded.subarray(0, 8)).toEqual(
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  );
  expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([
    1536,
    1024,
  ]);
  expect(thumbnail).toHaveAttribute('width', '1536');
  expect(thumbnail).toHaveAttribute('height', '1024');
});

it('renders the Bathroom Renovation project thumbnail without a binary-file dependency', () => {
  render(<ProjectGallery />);

  const thumbnail = screen.getByAltText('Bathroom renovation before and after');
  const source = thumbnail.getAttribute('src') ?? '';
  const decoded = Buffer.from(source.split(',')[1], 'base64');

  expect(source).toMatch(/^data:image\/png;base64,/);
  expect(decoded.subarray(0, 8)).toEqual(
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  );
  expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([
    1528,
    1029,
  ]);
  expect(thumbnail).toHaveAttribute('width', '1528');
  expect(thumbnail).toHaveAttribute('height', '1029');
});
