<script>
  export let data;
</script>

<div class='m-auto p-5'>
  <div class='bg-light rounded d-inline small p-2'>
    Tags: {data.tags}
  </div>
  <div class='display-4 my-3'>
    <q>
      {data.content}
    </q>
  </div>
  <div>
    Author: {data.author}
  </div>
</div>