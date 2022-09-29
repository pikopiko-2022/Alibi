/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('complaints').del()
  await knex('complaints').insert([
    {
      id: 1,
      issue_id: 1,
      image: `https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2017%2F09%2F01%2Fsink-of-dishes-2000.jpg`,
      complaint_raised_by: 1,
      date_raised: new Date(Date.now()),
      culprit_id: null,
      resolved: 0,
    },
    {
      id: 2,
      issue_id: 2,
      image: `https://media.istockphoto.com/photos/leaking-pipe-picture-id466029458?k=20&m=466029458&s=612x612&w=0&h=08ri3BXMAnjn2efmiRzBGSYVj9Az5AzAdf-RYDYKL14=`,
      complaint_raised_by: 2,
      date_raised: new Date(Date.now()),
      culprit_id: null,
      resolved: 0,
    },
    {
      id: 3,
      issue_id: 3,
      image: `https://media.istockphoto.com/photos/leaking-pipe-picture-id466029458?k=20&m=466029458&s=612x612&w=0&h=08ri3BXMAnjn2efmiRzBGSYVj9Az5AzAdf-RYDYKL14=`,
      complaint_raised_by: 1,
      date_raised: new Date(Date.now()),
      culprit_id: 2,
      resolved: 0,
    },
  ])
}
